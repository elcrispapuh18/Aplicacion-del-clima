const APIKEY = '529a1820c845ec560dad8654cb6a4061';
const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url){
    return fetch(url).then(result => result.json());
}


 async function getClima(lat, lon){
    const url = URLBASE + `lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    const data = await request(url);
    console.log("Temparatura: ", data.main.temp);
    console.log("Ciudad: ", data.name);
    updateDOM(data.main.temp, data.name);
}

function updateDOM(temp, name){
    const temperatura = document.getElementById('temperatura');
    const country = document.getElementById('country');
    const tempC = (temp - 273.15).toFixed(2);

    temperatura.textContent = `${tempC}`;
    country.textContent = `${name}`;

    const fondo = changeBackgroundImage(tempC);
    document.body.style.backgroundImage = fondo;
}

function changeBackgroundImage(temperatura){
    if(temperatura < 10){
        return 'url(https://i.gifer.com/E2MU.gif)'; //frío
    } else { 
        return 'url(https://i.gifer.com/ZQ6J.gif)'; //calor
    }
}

navigator
    .geolocation
    .getCurrentPosition(positions => {
        const lat = positions.coords.latitude;
        const lon = positions.coords.longitude;
        getClima(lat, lon);
    })