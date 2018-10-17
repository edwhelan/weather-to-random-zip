// DOM SELECTION 
const triggerElement = document.querySelector('[data-trigger]');
const outputElement = document.querySelector('[data-output]');


//FUNCTION THAT GETS DATA
function showError(){
    console.log('woooops');
    // alert('Oh no there is no more weather in that random zipcode...');
}
function getWeatherZip(){
    let zipCode = (randomZip()).pad(5);
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=d3c27155f41743fedfaa0b91989afba8`)
        .then(r => r.json() )
        .then(w => drawWeather(w.weather[0].description, w.name)) 
        .catch(showError)
}
//FUNCTION THAT DRAWS WEATHER TO DOM
function drawWeather(weatherStatus, place){
    const newZip = document.createElement('li');
    newZip.textContent = `${place} ${weatherStatus}`;
    outputElement.appendChild(newZip);
}

//MAIN FUNCTION THAT LISTENS FOR BUTTON CLICK
function main() {
    triggerElement.addEventListener('click', getWeatherZip);
}

main();

//Math to determine random ZipCode
function randomZip(){
    return Math.round(Math.random() * 99950);
}

Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}