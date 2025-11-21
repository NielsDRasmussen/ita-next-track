addEventListener("DOMContentLoaded", () => {
    let partyId = establishPartyId();
    history.replaceState(null, '', partyId);
    addEventListener('popstate', () => {
        partyId = establishPartyId();
    });
    pollForCurrentTrackAt(partyId);
});

// Extract party ID from browser's address field
// or make one up, if it doesn't have one
function establishPartyId() {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/') && pathname.length > 1) {
        return pathname.substring(1);
    } else {
        return crypto.randomUUID().substring(0, 4);
    }
}

// Start polling loop, repeated asking server for the current track
async function pollForCurrentTrackAt(partyId) {
    const path = `/api/party/${partyId}/currentTrack`;
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`GET ${path} failed with ${response.status} ${response.statusText}`)
    }
    const track = await response.json();
    renderCurrentTrack(partyId, track);
    setTimeout(() => pollForCurrentTrackAt(partyId), 1000); // refresh every 1000ms
}

// update HTML to reflect party ID and current track
function renderCurrentTrack(partyId, track) {
    const contentDiv = document.getElementById('content');
    contentDiv.textContent = `Party ${partyId} is now listening to ${track.title} by ${track.artist}`
}

