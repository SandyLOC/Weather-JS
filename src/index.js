let apiKey = "73b2674189dd157fb1ec3b25880baefd";
let units = "metric";
//Write data of geolocation on the screen

function getCoords(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  console.log(longitude);
  let object = {
    latitude,
    longitude
  };
  return object;
}
function getTemp(latitude, longitude, units) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;
  return axios.get(`${apiUrl}&appid=${apiKey}`).then((response) => {
    return {
      name: response.data.name
    };
  });
}
function getValues(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    let { latitude, longitude } = getCoords(position);
    getTemp(latitude, longitude, units).then((location) => {
      document.querySelector(".city").innerHTML = location.name;
      getValues(location.name);
    });
  });
}
//Write data of city on the screen
function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  celciusTemp = response.data.main.temp;
  let temperature = Math.round(celciusTemp);
  document.querySelector(".today").innerHTML = temperature;
  let iconPrincipal = document.querySelector("#icon1");
  iconPrincipal.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  let weatherDescription = response.data.weather[0].description;
  iconPrincipal.setAttribute("alt", weatherDescription);
  let showDescription = weatherDescription[0].toUpperCase() + 
  weatherDescription.slice(1);
  document.querySelector(".description").innerHTML = showDescription;
  document.querySelector(".humid").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  sendCoords(response.data.coord);
}

function showValue(event) {
  event.preventDefault();
  let form = document.querySelector(".form-control");
  let reset = document.querySelector("form");
  let city = form.value;
  getValues(city);
  reset.reset();
}
//Buttons
let search = document.querySelector("form");
search.addEventListener("submit", showValue);

let current = document.querySelector(".current");
current.addEventListener("click", showCurrent);
//Units
function getCelcius() {
  let todayTemp = document.querySelector(".today");
  todayTemp.innerHTML = Math.round(celciusTemp);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
function getFahrenheit() {
  let todayTemp = document.querySelector(".today");
  let toFaranheit = Math.round((celciusTemp * 9) / 5 + 32);
  todayTemp.innerHTML = toFaranheit;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celciusTemp = null;
let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", getCelcius);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", getFahrenheit);

getValues("New York");