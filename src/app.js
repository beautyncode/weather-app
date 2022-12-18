let date = document.querySelector("#current-date");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
date.innerHTML = `${days[dayIndex]} ${hours}:${minutes}`;

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function getCurrentTemp(city) {
  let apiKey = "866a208a73eeff02182218e9441647a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getCurrentTemp(city);
}

function getPosition(position) {
  let apiKey = "866a208a73eeff02182218e9441647a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

getCurrentTemp("New York");
