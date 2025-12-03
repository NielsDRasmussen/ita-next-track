//Volumebar//
var slider = document.getElementById("myRange");
var output = document.getElementById("Volume");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}


//Tilbage til forsiden
document.querySelector('.round-btn.leave').addEventListener('click', () => {
    window.location.href = '/1.FrontPage/FrontPage.html';
});

