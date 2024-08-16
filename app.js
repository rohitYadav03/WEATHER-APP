let input_box = document.getElementById("input-box");
let button = document.getElementById("btn");

const getCountryName = (code) => {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
};

let getWeatherData = async () => {
    let city_name = input_box.value;
    let api_key = "d6a1d201c591a1364f7d38ceeb019a7f";
    let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=metric`;

    let response = await fetch(api_url);
    let data = await response.json();
    if (data.cod === "404") {
        alert("City not found");
    } else {
        let extraInfo = document.querySelector(".weather_info");
        let iconCode = data.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
        let countryName = getCountryName(data.sys.country);

        extraInfo.innerHTML = `
            <h2>${data.name}, ${countryName}</h2>
            <img src="${iconUrl}" alt="Weather Image" />
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
};

button.addEventListener("click", getWeatherData);
input_box.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        getWeatherData();
    }
});