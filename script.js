var searchCity = $(".input");
var searchButton = $("#searchButton");
var currCity = $("#currentCity");
var currTemp = $("#temperature");
var currHumidity = $("#humidity")
var currwindSpeed = $("#windSpeed");
var currUvIndex = $("#uvIndex");
var searchHistory = $(".searchHistory");

var today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
var date = mm + '/' + dd + '/' + yyyy;
console.log(date);


//retrieve searched cities from local storage and renders to page
var cityList = localStorage.getItem("city-list");
if (cityList === null) {
  cityList = [];
} else {
  cityList = JSON.parse(cityList);
  renderList();
}

// WHEN I search for a city
searchButton.on("click", function () {
  searchCity.val();
  //saves searched city to local storage
  cityList.push(searchCity.val());
  localStorage.setItem("city-list", JSON.stringify(cityList));

  //returns the inputted city into the console
  console.log(searchCity.val());
  getWeather();
  Get5DayForecast();
  // getUvIndex();
});

//render function to display searched cities
function renderList() {
  var cityListTag = document.querySelector("ul");

  //creates list for cities searched
  if (cityListTag === null) {
    cityListTag = document.createElement("ul");
    searchHistory.append(cityListTag);
  }

  var innerList = "";
  for (var e = 0; e < cityList.length; e++) {
    innerList += `<li> ${cityList[e]} </li>`;
  }
  cityListTag.innerHTML = innerList;
}

renderList();


//function that gets the current weather for the city
function getWeather() {
  //API & key
  var apiKey = "d46664f3ff3305cc0b36e663654a667d";
  var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity.val() + "&appid=" + apiKey;

  //ajax call
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function (response) {
    console.log(queryUrl);
    console.log(response);

    var weathericon = response.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";

    //displays current weather data and city name
    currCity.html("<h1>" + response.name + " " + date + "<img src=" + iconurl + "></img>" + "</h1>");


    //converts celcius to fahrenheit
    var tempfahrenheit = (response.main.temp - 273.15) * 1.80 + 32;
    currTemp.text("Temperature: " + tempfahrenheit.toFixed(2) + "°F");
    currwindSpeed.text("Wind Speed: " + response.wind.speed + " mph");
    currHumidity.text("Humidity: " + response.main.humidity + "%");


    UVIndex(response.coord.lon, response.coord.lat);

  })
}

function UVIndex(ln, lt) {
  //lets build the url for uvindex.
  var queryUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=d46664f3ff3305cc0b36e663654a667d" + "&lat=" + lt + "&lon=" + ln;

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    currUvIndex.html("UV Index:" + " " + response.value);
  });
}


// five day forecast
function Get5DayForecast() {
  var queryUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity.val() + "&appid=d46664f3ff3305cc0b36e663654a667d";
  $("#card-row").empty();
  //ajax call to retrieve 5 day forecast
  $.ajax({
    url: queryUrlForecast,
    method: "GET",

  }).then(function (fiveDayReponse) {
    for (let i = 0; i != fiveDayReponse.list.length; i += 8) {
      let cityObj = {
        date: fiveDayReponse.list[i].dt_txt,
        icon: fiveDayReponse.list[i].weather[0].icon,
        temp: fiveDayReponse.list[i].main.temp,
        humidity: fiveDayReponse.list[i].main.humidity,
      }
      let dateStr = cityObj.date;
      let trimmedDate = dateStr.substring(0, 10);
      let weatherIco = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
      createForecastCard(trimmedDate, weatherIco, cityObj.temp, cityObj.humidity);
    }
  })
}
function createForecastCard(date, icon, temp, humidity) {
  // HTML elements 
  let fiveDayCardEl = $("<div>").attr("class", "five-day-card");
  let cardDate = $("<h1>").attr("class", "card-text");
  let cardIcon = $("<img>").attr("class", "weatherIcon");
  let cardTemp = $("<p>").attr("class", "card-text");
  let cardHumidity = $("<p>").attr("class", "card-text");

  $("#card-row").append(fiveDayCardEl);
  cardDate.text(date);
  cardIcon.attr("src", icon);
  cardTemp.text(`Temp: ${((temp - 273.15) * 1.80 + 32).toFixed(2)} °F`);
  cardHumidity.text(`Humidity: ${humidity}%`);
  fiveDayCardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);
}