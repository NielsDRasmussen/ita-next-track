//Screenshot funktionen ------
async function takeScreenshot() { 
    //En async functione gør sådan du ikke skal vente = Den kører i baggrunden mens en normal funktionen kan tage et par sekunder at starte
    //Vælger hvilket element der skal screenshottes (hele body = hele siden)
    const element = document.body;
    //html2canvas "fotograferer" elementet og lavet det til et canvas
    //await betyder: vent på at html2canvas er færdig før du forstætter
    const canvas = await html2canvas(element);
    //Lav et usynligt download-link
    const link = document.createElement('a');
    link.download = 'jam-results.png';
    link.href = canvas.toDataURL();
    link.click();
}

//Tilbage til forsiden
document.getElementById('home-btn').addEventListener('click', () => {
    window.location.href = '/1.FrontPage/FrontPage.html';
});

//Confetti stopper efter første afspilning
// I din Leaderboard.js fil
window.addEventListener('load', function() {
    const confettiLayer = document.querySelector('.confetti-layer');
    
    // Fjern confetti efter 3 sekunder (juster til din GIF's længde)
    setTimeout(function() {
        confettiLayer.style.opacity = '0';
        confettiLayer.style.transition = 'opacity 1s';
        
        // Fjern elementet helt efter fade-out
        setTimeout(function() {
            confettiLayer.style.display = 'none';
        }, 1000);
    }, 3000); // 3000ms = 3 sekunder
});

// --- POPUP MENU LUKKE OG START ---
// Henter elementer
const popupShare = document.getElementById('popupShare');
const closeBtnPopup = document.getElementById('closePopup'); // Omdøbt variablen

function openPopup() {
    popupShare.classList.add('active');
}

function closePopupFunc() { // Omdøbt funktionen
    popupShare.classList.remove('active'); // Ændret "popup" til "popupShare"
}

// Luk popup når man klikker på X
closeBtnPopup.addEventListener('click', closePopupFunc);

// Luk popup når man klikker udenfor boksen
popupShare.addEventListener('click', function(e) {
    if (e.target === popupShare) {
        closePopupFunc();
    }
});