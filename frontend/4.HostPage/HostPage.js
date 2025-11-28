// 1. Hent popup HTML og indsæt i siden
fetch("../6.Requests/RequestPopup.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("requestPopupContainer").innerHTML = html;
    });

// 2. Request Song knap åbner popup med en test-sang
document.getElementById("requestSongBtn").addEventListener("click", () => {
    showRequestPopup("Shape of You – Ed Sheeran");
});