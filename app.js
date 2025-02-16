const form = document.querySelector("#form");
const cityInput = document.querySelector("#cityInput"); // Get the city input field

async function checkWeather(city) {
  // Show "Loading..." message before fetching the data
  document.querySelector("#cityContent").textContent = "Loading...";
  document.querySelector(".loading-container").style.display = "block";

  // Wait for 2 seconds before fetching the data
  setTimeout(async () => {
    // Construct the URL with the dynamic city name inside the function
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be91a052a428d9acca2674b9cf179b46&units=metric`;
    // Fetch the weather data
    const response = await fetch(url);
    let data = await response.json();

    if (response.status == 404) {
      document.querySelector("#cityContent").textContent = "Invalid City Name";
      document.querySelector("#humiditytext").textContent = "";
      document.querySelector("#windtext").textContent = "";
    } else {
      document.querySelector("#cityContent").textContent = data.name;
      document.querySelector("#humiditytext").textContent = "Humidity";
      document.querySelector("#windtext").textContent = "wind";
      document.querySelector("#Temperature").textContent =
        "Temperature:" + Math.round(data.main.temp) + "°C";
      document.querySelector("#Humidity").textContent =
        data.main.humidity + "%";
      document.querySelector("#wind").textContent =
        Math.round(data.wind.speed) + "km/h";

      const weatherContainer = document.querySelector(".wheather-container ");
      const weatherCondition = data.weather[0].main.toLowerCase(); // Get the weather condition in lowercase

      if (weatherCondition === "clear") {
        weatherContainer.style.backgroundImage =
          "url('https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_1280.jpg')"; // Clear sky background
      } else if (weatherCondition === "clouds") {
        weatherContainer.style.backgroundImage =
          "url('https://static.vecteezy.com/system/resources/thumbnails/007/354/009/small/white-fluffy-clouds-with-blue-sky-on-sunny-day-beautiful-summer-cloudy-sky-background-free-photo.jpg')"; // Cloudy background
      } else if (weatherCondition === "rain") {
        weatherContainer.style.backgroundImage =
          "url('https://t4.ftcdn.net/jpg/01/59/19/81/360_F_159198166_N6hs0y3lnoeWm6uiaBgHgpYZf3xjQNke.jpg')"; // Rainy background
      } else if (weatherCondition === "snow") {
        weatherContainer.style.backgroundImage =
          "url('https://cdn.pixabay.com/photo/2019/10/07/11/26/winter-landscape-4532412_640.jpg')"; // Snowy background
      } else if (weatherCondition === "thunderstorm") {
        weatherContainer.style.backgroundImage =
          "url('https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?cs=srgb&dl=pexels-andre-furtado-43594-1162251.jpg&fm=jpg')"; // Thunderstorm background
      } else if (weatherCondition === "smoke") {
        weatherContainer.style.backgroundImage =
          "url('https://dht7q8fif4gks.cloudfront.net/2024-07/Smoke%201%20July%2024%202024_0.jpg')"; // Corrected smoke image background
      }
    }
  }, 2000);
}

/* form event listener */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();

  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
