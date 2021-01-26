var searchCity = $("#input");
var searchButton = $("#searchButton");
var currCity = $("#currentCity");
var currTemperature = $("#temperature");
var currHumidty = $("#humidity");
var currWindSpeed = $("#windSpeed");
var currUvIndex = $("#uvIndex");
var city = "London"


var apiKey = "d46664f3ff3305cc0b36e663654a667d"
var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

$.ajax({
  url: queryUrl,
  method: "GET"
}).then(function (response) {
  console.log(queryUrl);
  console.log(response);

});





// GIVEN a weather dashboard with form inputs


// WHEN I search for a city


// THEN I am presented with current and future conditions for that city and that city is added to the search history


// WHEN I view current weather conditions for that city


// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


// WHEN I view the UV index


// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


// WHEN I view future weather conditions for that city


// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity


// WHEN I click on a city in the search history


// THEN I am again presented with current and future conditions for that city


// WHEN I open the weather dashboard


// THEN I am presented with the last searched city forecast
