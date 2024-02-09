const apiKey = 'f151a643a88440ad0fc016d2249efa39';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url) {
    return fetch(url).then(response => response.json());
}

async function getWeatherByCoords(lat, lon) {
    const url = baseUrl + `lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const data = await request(url);
    updateDOM(data.main.temp, data.name);
    changeBackgroundImage(data.weather[0].main);
}

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    const url = baseUrl + `q=${city}&appid=${apiKey}&units=metric`;
    const data = await request(url);

    if (data.cod === "404") {
        alert("No se encontró la ciudad. Intenta de nuevo.");
        return;
    }

    updateDOM(data.main.temp, data.name);
    changeBackgroundImage(data.weather[0].main);
}

function updateDOM(temperature, cityName) {
    document.getElementById("temperature").textContent = temperature;
    document.getElementById("cityName").textContent = cityName;
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