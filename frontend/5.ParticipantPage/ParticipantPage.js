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



// Participants knap - toggle dropdown
document.getElementById('participantsBtn').addEventListener('click', async () => {
    const dropdown = document.getElementById('participantsList');
    
    if (dropdown.style.display === 'none') {
        await loadParticipants(); // Refresh data
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
});

// Hent deltagere fra server
async function loadParticipants() {
    const jamCode = localStorage.getItem('jamCode');
    const response = await fetch(`/api/jams/${jamCode}/participants`);
    const participants = await response.json();
    
    const dropdown = document.getElementById('participantsList');
    dropdown.innerHTML = ''; // Ryd dropdown
    
    if (participants.length === 0) {
        dropdown.innerHTML = '<option>Ingen deltagere endnu</option>';
    } else {
        participants.forEach(p => {
            const option = document.createElement('option');
            option.textContent = p.name;
            dropdown.appendChild(option);
        });
    }
}