//Screenshot funktionen ------
async function takeScreenshot() { // En async funktion i JS er en speciel type funktion, der gør det muligt at pause koden uden at blokkere resten af programmet
    const element = document.body; // Den taget screenshot af hele "Body"
    const canvas = await html2canvas(element); //html2canvas gennemgår alle elementer, styles, font, farver og layout og tegner det som et flat billede / Uden await ville funktionen prøve at bruge canvas inden billede er skabt -> fejl
    const link = document.createElement('a'); // Laver et usynligt link-element / Browersen bruger <a> til downloads, så dette er den nemmeste metode
    link.download = 'jam-results.png'; // Den downloader billede og kalder den "jam-results.png"
    link.href = canvas.toDataURL(); //
    link.click(); // Dette simulere et klik på linket -> Brugeren ser ikke noget, men browseren downloader filen
}

//Tilbage til forsiden -- Den linker "home-btn" til fronpage når man klikker på knappen
document.getElementById('home-btn').addEventListener('click', () => {
    window.location.href = '/1.FrontPage/FrontPage.html';
});

//Confetti stopper efter første afspilning
window.addEventListener('load', function() {
    const confettiLayer = document.querySelector('.confetti-layer');
    
    // Fjern confetti efter 3 sekunder 
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
const popupShare = document.getElementById('popupShare'); // Browseren leder i hele dokumentet efter to elementer -> Hele popup-overlay'et og luk-knappen ("x")
const closeBtnPopup = document.getElementById('closePopup'); 

function openPopup() {
    popupShare.classList.add('active'); // Dette tilføjer CSS-klassen active -> Resultat: popup vises på en pæn måde
}

function closePopupFunc() { 
    popupShare.classList.remove('active'); // Fjerner klassen -> Popup bliver usynlig igen
}

// Luk popup når man klikker på x
closeBtnPopup.addEventListener('click', closePopupFunc);

// Luk popup når man klikker udenfor boksen
popupShare.addEventListener('click', function(event) {
    if (event.target === popupShare) {
        closePopupFunc();
    }
}); // Dette gør at hvis du klikker uden for boksen -> Luk og hvis du klikker inde i boksen -> Luk ikke