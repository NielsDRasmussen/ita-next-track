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

// Get the like button
let TrashBtn = document.getElementsByClassName("trash")[0];

// When the user clicks on the confirm button, open the modal and close the song modal
  btn.onclick = function() {
  SongModal.style.display = "none";
  modal.style.display = "block";
}
// When the user clicks on the like button, close the modal
  LikeBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on the trash button, close the modal
  TrashBtn.onclick = function() {
  modal.style.display = "none";
}

// Volume slider
let slider = document.getElementById("myRange");
let output = document.getElementById("Volume");
output.textContent = slider.value;

slider.oninput = function() {
  output.textContent = this.value;
}