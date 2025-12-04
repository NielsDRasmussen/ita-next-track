//Start jam knap 
document.getElementById('startBtn').addEventListener('click', () => {
    window.location.href = '/5.ParticipantPage/ParticipantPage.html';
});

//Tilbage til forsiden
document.querySelector('.close-btn').addEventListener('click', () => {
    window.location.href = '/1.FrontPage/FrontPage.html';
});





//Start jam knap 
document.getElementById('startBtn').addEventListener('click', joinJam);  // ← ÆNDRET


//Tilbage til forsiden
document.querySelector('.close-btn').addEventListener('click', () => {
    window.location.href = '/1.FrontPage/FrontPage.html';
});


async function joinJam() {
    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    
    // Tilføj deltager til jam'et
    const response = await fetch(`/api/jams/${code}/participants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    
    const data = await response.json();
    
    if (data.success) {
        // Gem code så vi kan bruge den på participant page
        localStorage.setItem('jamCode', code);
        
        // Gå til participant page
        window.location.href = '/5.ParticipantPage/ParticipantPage.html';
    } else {
        alert('Kunne ikke finde jam med den kode!');
    }
}