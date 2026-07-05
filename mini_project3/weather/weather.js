const apiKey = "8a9593a29eac476883353027260507";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {

        weatherResult.innerHTML = "<h2>Loading...</h2>";

        const response = await fetch(url);

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        displayWeather(data);

    }

    catch (error) {

        weatherResult.innerHTML = `
            <h2>${error.message}</h2>
        `;

    }

}

function displayWeather(data){

weatherResult.innerHTML=`

<div class="weather">

<h2>
📍 ${data.location.name},
${data.location.country}
</h2>

<img
src="${data.current.condition.icon}"
>

<h1>

${data.current.temp_c}°C

</h1>

<h3>

${data.current.condition.text}

</h3>

<p>

Feels Like:
${data.current.feelslike_c}°C

</p>

<div class="details">

<div class="box">

<h3>💧 Humidity</h3>

<p>

${data.current.humidity}%

</p>

</div>

<div class="box">

<h3>🌬 Wind</h3>

<p>

${data.current.wind_kph} km/h

</p>

</div>

</div>

</div>

`;

}
cityInput.addEventListener("keypress",function(event){

if(event.key==="Enter"){

getWeather();

}

});