// Når siden loader, vis code og load deltagere
window.addEventListener("load", async () => {
  const jamCode = localStorage.getItem("jamCode");

  // Vis code
  document.getElementById("codeDisplay").textContent = `Code: ${jamCode}`;

  // Load deltagere første gang
  await loadParticipants();
});

// Hent deltagere fra server
async function loadParticipants() {
  const jamCode = localStorage.getItem("jamCode");
  const response = await fetch(`/api/jams/${jamCode}/participants`);
  const participants = await response.json();

  const tableBody = document.getElementById("participantsTableBody");
  tableBody.innerHTML = "";

  participants.forEach((p) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${p.name}</td>`;
    tableBody.appendChild(row);
  });
}

//Opdater deltagere hvert 3. sekund
setInterval(loadParticipants, 3000);

//-----------------------------------------------------

//Til leaderboard siden
document.querySelector(".round-btn.end").addEventListener("click", () => {
  window.location.href = "/7.Leaderboard/Leaderboard.html";
});

//--------------------------------------

let participantsModal = document.getElementById("participantsModal");

// Get the button that opens the modal
let openBtn = document.getElementById("participantsButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("Close")[0];

// When the user clicks the button, open the modal
openBtn.onclick = function () {
  participantsModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  participantsModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == participantsModal) {
    participantsModal.style.display = "none";
  }
};

// Get the modal
let SongModal = document.getElementById("NewSong");
let AddBtn = document.getElementById("AddBtn");
let NewSpan = document.getElementsByClassName("Exit")[0];

// When the user clicks on the confirm button, open the modal
AddBtn.onclick = function () {
  SongModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
NewSpan.onclick = function () {
  SongModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    SongModal.style.display = "none";
  }
};

// Her starter koden for popup for de andre deltagere
let modal = document.getElementById("RequestPopup");
let btn = document.getElementById("Confirm-Btn");
let LikeBtn = document.getElementsByClassName("like")[0];
let TrashBtn = document.getElementsByClassName("trash")[0];
let timeLeft = 30;
let countdownInterval;
let searchInput = document.getElementById("SrchSong");
let dropdown = document.getElementById("SongDropdown");
let Selection = document.getElementById("SongSelection");
const timerDisplay = document.getElementById("timer");

btn.disabled = true; // Deaktiver knappen som standard

searchInput.addEventListener("input", async () => {
  let query = searchInput.value.trim();

  if (query.length === 0) {
    dropdown.innerHTML = "";
    dropdown.style.display = "none";
    btn.disabled = true; // Deaktiver knappen hvis input er tomt
    return;
  }

  let res = await fetch(`/api/songs?search=${encodeURIComponent(query)}`);
  let songs = await res.json();

  dropdown.innerHTML = "";
  dropdown.style.display = "block";

  songs.forEach((song) => {
    let div = document.createElement("div");
    div.classList.add("dropdown-item");
    div.textContent = `${song.title} – ${song.artist}`;

    div.onclick = () => {
      searchInput.value = song.title;
      dropdown.style.display = "none";
      btn.disabled = false; // Aktiver knappen når en sang er valgt
      btn.classList.add("active-btn"); // Tilføj en klasse for visuel feedback
    };

    dropdown.appendChild(div);
  });
});

btn.onclick = function () {
  SongModal.style.display = "none";
  modal.style.display = "block";

  // Reset timer
  timeLeft = 30;
  timerDisplay.innerText = timeLeft;
  timerDisplay.style.display = "block";

  // Start countdown
  countdownInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
      // luk modal automatisk når timer er færdig
      modal.style.display = "none";
      timerDisplay.style.display = "none";
      clearInterval(countdownInterval);
    }
  }, 1000);
};

// Like button lukker modal Og stopper/resetter timer
LikeBtn.onclick = function () {
  modal.style.display = "none";
  timerDisplay.style.display = "none";
  clearInterval(countdownInterval);
};

// Trash button lukker modal Og stopper/resetter timer)
TrashBtn.onclick = function () {
  modal.style.display = "none";
  timerDisplay.style.display = "none";
  clearInterval(countdownInterval);
};

// ------------------------------
// Progress bar (tid-baseret)
// ------------------------------
let isPlaying = false;

function move(duration) {
  // duration i millisekunder
  if (!isPlaying) {
    isPlaying = true;

    let elem = document.getElementById("myBar");
    let currentTimeEl = document.getElementById("currentTime");
    let totalTimeEl = document.getElementById("totalTime");

    elem.style.width = "0%"; // reset progressbar
    currentTimeEl.textContent = "0:00";
    totalTimeEl.textContent = formatTime(duration / 1000); // vis total tid

    let currentTime = 0;
    let step = 100; // opdater hver 100ms
    let id = setInterval(frame, step);

    function frame() {
      if (currentTime >= duration) {
        clearInterval(id);
        isPlaying = false;
        elem.style.width = "100%";
        currentTimeEl.textContent = formatTime(duration / 1000);
      } else {
        currentTime += step;
        let percent = (currentTime / duration) * 100;
        elem.style.width = percent + "%";

        // opdater tid i mm:ss
        currentTimeEl.textContent = formatTime(currentTime / 1000);
      }
    }
  }
}

// Hjælpefunktion til mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ------------------------------
// Play/pause-knap
// ------------------------------
let progressInterval;   // gemmer interval ID
let currentProgress = 0; // husker nuværende tid i ms
let currentDuration = 0; // husker varighed i ms

function playPause() {
  const btn = document.querySelector(".playPauseBtn");
  const elem = document.getElementById("myBar");
  const currentTimeEl = document.getElementById("currentTime");

  if (isPlaying) {
    // Pause
    clearInterval(progressInterval);
    isPlaying = false;
    btn.textContent = "▶"; // ændr ikon
  } else {
    // Play / fortsæt
    isPlaying = true;
    btn.textContent = "II"; // ændr ikon

    const step = 100; // opdater hver 100ms
    progressInterval = setInterval(() => {
      if (currentProgress >= currentDuration) {
        clearInterval(progressInterval);
        isPlaying = false;
        btn.textContent = "▶";
        elem.style.width = "100%";
        currentTimeEl.textContent = formatTime(currentDuration / 1000);
      } else {
        currentProgress += step;
        let percent = (currentProgress / currentDuration) * 100;
        elem.style.width = percent + "%";
        currentTimeEl.textContent = formatTime(currentProgress / 1000);
      }
    }, step);
  }
}

// Opdater move-funktionen til at gemme varighed og nulstille progress
function move(duration) {
  const elem = document.getElementById("myBar");
  const currentTimeEl = document.getElementById("currentTime");
  const totalTimeEl = document.getElementById("totalTime");

  clearInterval(progressInterval); // stop evt. eksisterende
  isPlaying = false;
  currentProgress = 0;
  currentDuration = duration;

  elem.style.width = "0%";
  currentTimeEl.textContent = "0:00";
  totalTimeEl.textContent = formatTime(duration / 1000);
  
  // Start automatisk
  playPause();
}


// ------------------------------
// Hent ét track fra backend
// ------------------------------
function loadTrack(trackId) {
  fetch(`/api/tracks/${trackId}`)
    .then((res) => res.json())
    .then((track) => {
      console.log("Track hentet:", track);

      // Opdater UI
      document.getElementById("songTitle").textContent = track.title;
      document.getElementById("songArtist").textContent = track.artist;

      // Start progress-baren
      move(track.duration);
    })
    .catch((err) => console.error("Fejl:", err));
}

// ------------------------------
// Start en sang når siden loader
// ------------------------------
window.onload = function () {
  const randomId = Math.floor(Math.random() * 201) + 1; // tilfældigt tal mellem 1 og 10
  loadTrack(randomId);
};


//Queue funktion
// --- Queue: hent og vis næste 5 sange ---
async function loadQueue() {
  try {
    const jamCode = localStorage.getItem("jamCode") || ""; // samme som andre calls
    if (!jamCode) return;

    const res = await fetch(`/api/party/${encodeURIComponent(jamCode)}/queue`);
    if (!res.ok) return;

    const queue = await res.json();

    const tbody = document.getElementById("queueTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    queue.forEach((track) => {
      // Durations kan være i sekunder eller millisekunder afhængig af DB.
      // Hvis duration ser stor (> 1000) tolker vi som ms, ellers sekunder.
      let seconds;
      if (typeof track.duration === "number") {
        seconds = track.duration > 1000 ? Math.round(track.duration / 1000) : track.duration;
      } else {
        // fallback parse
        const n = Number(track.duration);
        seconds = isNaN(n) ? 0 : (n > 1000 ? Math.round(n / 1000) : n);
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(track.artist)}</td>
        <td>${escapeHtml(track.title)}</td>
        <td>${formatSeconds(seconds)}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("loadQueue error:", err);
  }
}

// Helper: format sekunder til mm:ss
function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Enkel HTML-escape for sikker indsættelse i table
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Start queue-opdatering: initial load + interval
loadQueue();
setInterval(loadQueue, 5000); // opdater hvert 5. sekund
