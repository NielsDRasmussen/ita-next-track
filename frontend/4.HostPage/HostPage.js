//Til leaderboard siden
document.querySelector('.round-btn.end').addEventListener('click', () => {
    window.location.href = '/7.Leaderboard/Leaderboard.html';
});

// Get the modal
let SongModal = document.getElementById("NewSong");

// Get the button that opens the modal
let AddBtn = document.getElementById("AddBtn");

// Get the <span> element that closes the modal
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
// Get the modal
let modal = document.getElementById("RequestPopup");

// Get the button that opens the modal
let btn = document.getElementById("Confirm-Btn");

// Get the like button
let LikeBtn = document.getElementsByClassName("like")[0];

// Get the trash button
let TrashBtn = document.getElementsByClassName("trash")[0];

// Timer-setup
let timeLeft = 30;
let countdownInterval;
const timerDisplay = document.getElementById("timer");

// Åbn modal + start timer
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

// Trash button lukker modal Og stopper/resetter timer
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