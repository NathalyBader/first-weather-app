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
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="43"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let currentCity = document.querySelector("#current-city");

  currentCity.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#submit-city");
form.addEventListener("submit", searchCity);

function showCityWeather(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  celsius = response.data.main.temp;
  document.querySelector("span.temp-number").innerHTML = Math.round(celsius);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  let newIcon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${newIcon}@2x.png`
  );
  getForecast(response.data.coord);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  toCelsius.classList.remove("active");
  toFahrenheit.classList.add("active");
  let fahrenheit = (celsius * 9) / 5 + 32;
  let temperature = document.querySelector("span.temp-number");
  temperature.innerHTML = Math.round(fahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperature = document.querySelector("span.temp-number");
  temperature.innerHTML = Math.round(celsius);
  toCelsius.classList.add("active");
  toFahrenheit.classList.remove("active");
}

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", convertToFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", convertToCelsius);

let celsius = null;

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

search("munich");
