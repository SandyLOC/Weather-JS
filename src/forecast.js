function displayForecast() {
    let forecastScreen = document.querySelector("#forecast-days");

    let forecastHTML = `<div class="row">`;
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    days.forEach(function(day){
        forecastHTML = forecastHTML + 
        `
        <div class="col">
          <div class="forecast-date">${day}</div>
          <image src="http://openweathermap.org/img/wn/10d@2x.png" alt="clear"/>
         <div class="forecast-temperature">
          <span class="forecast-max">18°</span>
          <span class="forecast-min"> 23°</span>
        </div>
        </div>
      `;
    })
forecastHTML = forecastHTML + `</div>`;
    forecastScreen.innerHTML = forecastHTML;
  }