let daysWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
function getTime(date) {
    let day = date.getDay();
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${daysWeek[day]} ${hour}:${minutes}`;
  }
  let date = new Date();
  let dayVisual = document.querySelector(".day");
  dayVisual.innerHTML = getTime(date);
//forecast date formatting
  function formatDay(timestamp) {
    let forecastDate = new Date(timestamp * 1000);
    let day = forecastDate.getDay();
    return daysWeek[day];
  }