//Start jam knap - kald createJam i stedet!
document.getElementById('startBtn').addEventListener('click', createJam);


//Tilbage til forsiden
document.querySelector('.close-btn').addEventListener('click', () => {
    window.location.href = '/1.FrontPage/FrontPage.html';
});



async function createJam() {
    const name = document.getElementById('name').value;
    const code = document.getElementById('createCode').value;
    
    // Opret jam
    const response = await fetch('/api/jams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code })
    });
    
    // Tilføj host som deltager LIGE EFTER
    await fetch(`/api/jams/${code}/participants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    
    // Gem code selv hvis man refresher siden
    localStorage.setItem('jamCode', code); 
    
    // Gå til HOST page
    window.location.href = '/4.HostPage/HostPage.html';
}