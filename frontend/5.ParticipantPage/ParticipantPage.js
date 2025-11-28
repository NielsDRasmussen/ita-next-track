// Hent popup HTML og tilføj den til containeren
fetch("../6.Requests/RequestPopup.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("requestPopupContainer").innerHTML = html;
    });


// TEST: Når du åbner siden, efter 2 sek, vis popup
// Dette simulerer "Der er en der har anmodet om en sang"
setTimeout(() => {
    showRequestPopup("Blinding Lights – The Weeknd");
}, 2000);