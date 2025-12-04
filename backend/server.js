import express from 'express';
import path from 'path';
import { connect } from '../db/connect.js';
import { play } from './player.js';


const db = await connect();
const tracks = await loadTracks();
const currentTracks = new Map(); // maps partyCode to index in tracks

const port = process.env.PORT || 3003;
const server = express();

server.use(express.static('frontend', {index: '/1.FrontPage/FrontPage.html'}));
server.use(express.json());
server.use(onEachRequest);
server.get('/api/party/:partyCode/currentTrack', onGetCurrentTrackAtParty);
server.post('/api/jams', onCreateJam);
server.get('/api/jams/:code', onGetJam);
server.get('/api/jams/:code/participants', onGetParticipants);
server.post('/api/jams/:code/participants', onAddParticipant);
server.listen(port, onServerReady);

async function onGetCurrentTrackAtParty(request, response) {
    const partyCode = request.params.partyCode;
    let trackIndex = currentTracks.get(partyCode);
    if (trackIndex === undefined) {
        trackIndex = pickNextTrackFor(partyCode);
    }
    const track = tracks[trackIndex];
    response.json(track);
}

function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}

function onServerReady() {
    console.log('Webserver running on port', port);
}

async function loadTracks() {
    const dbResult = await db.query(`
        select track_id, title, artist, duration
        from   tracks
    `);
    return dbResult.rows;
}

function pickNextTrackFor(partyCode) {
    const trackIndex = Math.floor(Math.random() * tracks.length)
    currentTracks.set(partyCode, trackIndex);
    const track = tracks[trackIndex];
    play(partyCode, track.track_id, track.duration, Date.now(), () => currentTracks.delete(partyCode));
    return trackIndex;
}




