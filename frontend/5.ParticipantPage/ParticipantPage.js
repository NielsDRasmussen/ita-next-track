//Volumebar//
var slider = document.getElementById("myRange");
var output = document.getElementById("Volume");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
