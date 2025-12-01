// Get the modal
let RequestModal = document.getElementById("Confirm");

// Get the button that opens the modal
let btn = document.getElementById("Confirm");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the confirm button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let slider = document.getElementById("myRange");
let output = document.getElementById("Volume");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}