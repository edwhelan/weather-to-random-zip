// DOM SELECTION 
const triggerElement = document.querySelector('[data-trigger]');
const outputElement = document.querySelector('[data-output]');


//FUNCTION THAT GETS DATA
function showError(zip){
    console.log('woooops');
    console.log(zip);
    dummyZip(zip);

}
function getWeatherZip(){
    let zipCode = (randomZip()).pad(5);
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=d3c27155f41743fedfaa0b91989afba8`)
        .then(r => r.json() )
        // .then(cacheWeather)
        .then(w => drawWeather(w.weather[0].description, w.name))
        .catch(()=>{showError(zipCode)} )
}


//Function for caching older weather
function cacheWeather(weatherObj){
    console.log(weatherObj);
    if (weatherObj.weather[0].description && weatherObj.name){
        console.log('putting the money in the bank');
        localStorage.setItem('description', weatherObj.weather[0].description);
        //save weather description and weather name
        localStorage.setItem('name', weatherObj.name);
    }
    return weatherObj;
}

function showCachedWeather(err){
    console.log(err)
    return localStorage.getItem('description');

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

// function that prints line UL when zipcode isnt valid
function dummyZip(zip){
    const badZip = document.createElement('li');
    badZip.textContent = `${zip} zipcode not found!`;
    outputElement.appendChild(badZip)
}

//Math to determine random ZipCode
function randomZip(){
    return Math.round(Math.random() * 99950);
}

Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}