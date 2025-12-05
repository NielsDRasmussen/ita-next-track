

// Når siden loader, vis code og load deltagere
window.addEventListener('load', async () => {
    const jamCode = localStorage.getItem('jamCode');
    
    // Vis code
    document.getElementById('codeDisplay').textContent = `Code: ${jamCode}`;
    
    // Load deltagere første gang
    await loadParticipants();
});

// Participants knap - toggle dropdown
document.getElementById('participantsBtn').addEventListener('click', async () => {
    const dropdown = document.getElementById('participantsList');
    
    if (dropdown.style.display === 'none') {
        await loadParticipants(); // Refresh data
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
});

// Hent deltagere fra server
async function loadParticipants() {
    const jamCode = localStorage.getItem('jamCode');
    const response = await fetch(`/api/jams/${jamCode}/participants`);
    const participants = await response.json();
    
    const dropdown = document.getElementById('participantsList');
    dropdown.innerHTML = ''; // Ryd dropdown
    
    if (participants.length === 0) {
        dropdown.innerHTML = '<option>Ingen deltagere endnu</option>';
    } else {
        participants.forEach(p => {
            const option = document.createElement('option');
            option.textContent = p.name;
            dropdown.appendChild(option);
        });
    }
}

//-----------------------------------------------------

//Til leaderboard siden
document.querySelector('.round-btn.end').addEventListener('click', () => {
    window.location.href = '/7.Leaderboard/Leaderboard.html';
});

// Get the modal
let SongModal = document.getElementById("NewSong");
let AddBtn = document.getElementById("AddBtn");
let NewSpan = document.getElementsByClassName("Exit")[0];


// When the user clicks on the confirm button, open the modal
AddBtn.onclick = function() {
  SongModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
NewSpan.onclick = function() {
  SongModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    SongModal.style.display = "none";
  }
}

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

    songs.forEach(song => {
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
    
    

    btn.onclick = function() {
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
}

// Like button lukker modal Og stopper/resetter timer
LikeBtn.onclick = function() {
    modal.style.display = "none";
    timerDisplay.style.display = "none";
    clearInterval(countdownInterval);
}

// Trash button lukker modal Og stopper/resetter timer)
TrashBtn.onclick = function() {
    modal.style.display = "none";
    timerDisplay.style.display = "none";
    clearInterval(countdownInterval);
}

// Volume slider
let slider = document.getElementById("myRange");
let output = document.getElementById("Volume");
output.textContent = slider.value;

slider.oninput = function() {
  output.textContent = this.value;
}