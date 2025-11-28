let countdownNumber = 30;
let countdownInterval;

// Denne funktion åbner popuppen
function showRequestPopup(songName) {

    document.getElementById("requestedSong").innerText = songName;
    document.getElementById("requestPopup").style.display = "block";

    countdownNumber = 30;
    document.getElementById("countdown").innerText = countdownNumber;

    countdownInterval = setInterval(() => {
        countdownNumber--;
        document.getElementById("countdown").innerText = countdownNumber;

        if (countdownNumber <= 0) {
            closePopup();
        }
    }, 1000);
}

// Lukker popup
function closePopup() {
    clearInterval(countdownInterval);
    document.getElementById("requestPopup").style.display = "none";
}

// Når man trykker like eller trash
document.getElementById("likeBtn").addEventListener("click", () => {
    closePopup();
});

document.getElementById("trashBtn").addEventListener("click", () => {
    closePopup();
});
// DEBUG: Vis pop-up automatisk efter 1 sekund
setTimeout(() => {
    showRequestPopup({
        song: "Peaches",
        artist: "Justin Bieber",
        requesterName: "Test-Bruger"
    });
}, 1000);