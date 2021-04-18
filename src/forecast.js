function displayForecast(response) {
    let forecastScreen = document.querySelector("#forecast-days");
    let forecastHTML = `<div class="row">`;
    let forecast = response.data.daily;
    forecast.forEach(function(day, index) {
        if (index < 5) {
        forecastHTML = forecastHTML + 
        `
        <div class="col dailyForecast">
          <div class="forecast-date">${formatDay(day.dt)}</div>
          <image src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="clear"/>
         <div class="forecast-temperature">
          <span class="forecast-max">${Math.round(day.temp.max)}°</span>
          <span class="forecast-min">${Math.round(day.temp.min)}°</span>
        </div>
        </div>
      `;
        }
    })
    forecastHTML = forecastHTML + `</div>`;
    forecastScreen.innerHTML = forecastHTML;
}
function sendCoords(coordinates){
    console.log(coordinates);
    let latit = coordinates.lat;
    let longit = coordinates.lon;
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latit}&lon=${longit}&exclude=hourly,minutely&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}