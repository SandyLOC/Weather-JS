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
      name: response.data.name,
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
  let temperature = Math.round(response.data.main.temp);
  document.querySelector(".today").innerHTML = temperature;
  let iconPrincipal = document.querySelector("#icon1");
  iconPrincipal.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconPrincipal.setAttribute("alt", response.data.weather[0].description);
  document.querySelector(".description").innerHTML = response.data.weather[0].description;
  document.querySelector(".humid").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
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
let c = true;
let f = false;
function getCelcius() {
  let todayTemp = document.querySelector(".today");
  let toCelcius = Math.round(((todayTemp.innerHTML - 32) * 5) / 9);
  todayTemp.innerHTML = toCelcius;
}
function getFahrenheit() {
  let todayTemp = document.querySelector(".today");
  let toFaranheit = Math.round((todayTemp.innerHTML * 9) / 5 + 32);
  todayTemp.innerHTML = toFaranheit;
}
let showCelcius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#fahrenheit");

showCelcius.addEventListener("click", getCelcius);
fahrenheit.addEventListener("click", getFahrenheit);

getValues("New York");