//lets fetch the weather here with the help of our API
const weather = {
  apiKey: "a0b0acecf62b9a91bdadfbf8c388f3a6",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  //Now after extracting the data from the API . lets  store that data that we have fetched inside variables for further use
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `Temp is ${temp}°C`;
    document.querySelector(".humidity").innerText = `Humidity is ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind is ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      `url(https://source.unsplash.com/random/${name})`;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
//adding event listener so that when we hit enter button after finish typing our input it will gonna search for the result 
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  //this is our default city
weather.fetchWeather("Delhi");
