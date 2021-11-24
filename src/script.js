function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let currentCity = document.querySelector("#current-city");

  currentCity.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#submit-city");
form.addEventListener("submit", searchCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let celsius = 10;
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let temperature = document.querySelector("span.temp-number");
  temperature.innerHTML = `${fahrenheit}`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsius = 10;
  let temperature = document.querySelector("span.temp-number");
  temperature.innerHTML = `${celsius}`;
}

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", convertToFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", convertToCelsius);

function showCityWeather(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("span.temp-number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
}
function search(city) {
  let apiKey = "7c28ceb5d17087c814fc111c6aad10be";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCityWeather);
}

function searchCities(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function getPosition(position) {
  let apiKey = "7c28ceb5d17087c814fc111c6aad10be";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCityWeather);
}
function clickCurrentButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let searchForm = document.querySelector("#submit-city");
searchForm.addEventListener("submit", searchCities);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", clickCurrentButton);

search("sydney");
