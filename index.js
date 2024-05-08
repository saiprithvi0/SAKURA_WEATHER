const api = "e09ad5f299029c5784a4fbac8410a08d";
//api key for openweathermap.org

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${api}&units=metric`
    );
    if (!response.ok) {
      throw new Error("network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    const temprature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like : ${Math.round(data.main.feels_like)}`,
      `Humidity : ${data.main.humidity} %`,
      `Wind Speed : ${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector(".icon").innerHTML = ` <img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="Weather Icon"
  />`;
    weatherDataEl.querySelector(".temperature").textContent = `${temprature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(
      ".description"
    ).textContent = `there is an error bro, can't you even give a proper city name, you baka!!!`;

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
