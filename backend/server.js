import express from "express";
import path from "path";
import { connect } from "../db/connect.js";
import { play } from "./player.js";

const db = await connect();
const tracks = await loadTracks();
const currentTracks = new Map(); // maps partyCode to index in tracks

const port = process.env.PORT || 3003;
const server = express();

server.use(
  express.static("frontend", { index: "/1.FrontPage/FrontPage.html" })
);
server.use(express.json());
server.use(onEachRequest);
server.get("/api/party/:partyCode/currentTrack", onGetCurrentTrackAtParty);
server.post("/api/jams", onCreateJam);
server.get("/api/jams/:code", onGetJam);
server.get("/api/jams/:code/participants", onGetParticipants);
server.post("/api/jams/:code/participants", onAddParticipant);
server.get("/api/tracks/:id", onGetTrackById)
server.get("/api/party/:partyCode/queue", onGetQueue) //Queue funktion
server.get("/api/songs", onSearchSongs);
server.listen(port, onServerReady);


function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}

async function onGetCurrentTrackAtParty(request, response) {
  const partyCode = request.params.partyCode;
  let trackIndex = currentTracks.get(partyCode);
  if (trackIndex === undefined) {
    trackIndex = pickNextTrackFor(partyCode);
  }
  const track = tracks[trackIndex];
  response.json(track);
}

async function onCreateJam(request, response) {
  const body = request.body;
  const createdBy = body.name; // ← ÆNDRET: dit felt hedder created_by
  const code = body.code;

  const result = await db.query(`
        INSERT INTO jams (jam_code, created_by)
        VALUES ($1, $2)
        RETURNING id, jam_code
    `,[code, createdBy]
  ); // ← ÆNDRET: jam_code i stedet for code

  const jamId = result.rows[0].id;
  const jamCode = result.rows[0].jam_code;
  response.json({ success: true, jamId: jamId, code: jamCode });
}

async function onGetJam(request, response) {
  const code = request.params.code;

  const result = await db.query(`
    SELECT id, jam_code, created_by
    FROM jams
    WHERE jam_code = $1
    `,[code]
  ); // ← ÆNDRET: jam_code

  if (result.rows.length === 0) {
    response.status(404).json({ error: "Jam not found" });
    return;
  }

  response.json(result.rows[0]);
}

async function onGetParticipants(request, response) {
  const code = request.params.code;

  // Først find jam_id fra code
  const jamResult = await db.query(`
    SELECT id FROM jams WHERE jam_code = $1
    `, [code]
  ); // ← ÆNDRET: jam_code

  if (jamResult.rows.length === 0) {
    response.json([]);
    return;
  }

  const jamId = jamResult.rows[0].id;

  // Hent deltagere
  const result = await db.query(`
        SELECT id, name
        FROM participants
        WHERE jam_id = $1
        ORDER BY name
    `,
    [jamId]
  );

  response.json(result.rows);
}

async function onAddParticipant(request, response) {
  const code = request.params.code;
  const participantName = request.body.name;

  // Find jam_id fra code
  const jamResult = await db.query(`
    SELECT id FROM jams WHERE jam_code = $1
    `,[code]
  ); // ← ÆNDRET: jam_code

  if (jamResult.rows.length === 0) {
    response.status(404).json({ error: "Jam not found" });
    return;
  }

  const jamId = jamResult.rows[0].id;

  // Tilføj deltager
  await db.query(`
    INSERT INTO participants (jam_id, name)
    VALUES ($1, $2)
    `,[jamId, participantName]
  );

  response.json({ success: true });
}
// HENT ÉN TRACK EFTER ID
async function onGetTrackById(request, response) {
    const trackId = request.params.id;

    try {
        const result = await db.query(`
            SELECT track_id, title, artist, duration
            FROM tracks
            WHERE track_id = $1
        `, [trackId]);

        if (result.rows.length === 0) {
            return response.status(404).json({ error: "Track ikke fundet" });
        }

        response.json(result.rows[0]);  // sender én sang til frontend
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Databasefejl" });
    }
}


//Queue funktion
async function onGetQueue(request, response) {
  const jamCode = request.params.jamCode;
  const queue = [];
  let lastTrackId = null; // gemmer den forrige track_id

  for (let i = 0; i < 5; i++) {
    let track;
    do {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      track = tracks[randomIndex];
      // Hvis det er samme sang som sidst, vælg igen
    } while (track.track_id === lastTrackId);

    queue.push(track);
    lastTrackId = track.track_id; // opdater sidste track
  }

  response.json(queue);
};


// Søgefunktionalitet for sange
async function onSearchSongs(request, response) {
  const search = request.query.search?.toLowerCase() || "";
  const filtered = tracks
    .filter(
      (song) =>
        song.title.toLowerCase().includes(search) ||
        song.artist.toLowerCase().includes(search)
    )
    .slice(0, 20); // max 20 resultater
  response.json(filtered);
}

function onServerReady() {
  console.log("Webserver running on port", port);
}

async function loadTracks() {
  const dbResult = await db.query(`
        select track_id, title, artist, duration
        from   tracks
    `);
  return dbResult.rows;
}

function pickNextTrackFor(partyCode) {
  const trackIndex = Math.floor(Math.random() * tracks.length);
  currentTracks.set(partyCode, trackIndex);
  const track = tracks[trackIndex];
  play(partyCode, track.track_id, track.duration, Date.now(), () =>
    currentTracks.delete(partyCode)
  );
  return trackIndex;
}