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