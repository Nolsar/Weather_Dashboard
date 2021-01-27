var searchCity = $(".input");
var searchButton = $("#searchButton");
var currCity = $("#currentCity");
var currTemp = $("#temperature");
var currHumidity = $("#humidity")
var currwindSpeed = $("#windSpeed");
var currUvIndex = $("#uvIndex");


// WHEN I search for a city
searchButton.on("click", function () {
  searchCity.val();

  //returns the inputted city into the console
  console.log(searchCity.val());
  getWeather();
});

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

    currCity.html("<h1>" + response.name + "</h1>");
    var tempfahrenheit = (response.main.temp - 273.15) * 1.80 + 32;
    currTemp.text("Temperature: " + tempfahrenheit.toFixed(2) + " F");
    currwindSpeed.text("Wind Speed: " + response.wind.speed + " mph");
    currHumidity.text("Humidity: " + response.main.humidity + "%");

    

    //displays weather conditions in the console
    console.log(response.name);
    console.log(response.wind.speed);
    console.log(response.main.temp);
    console.log(response.main.humidity);
  });
}
//main.temp
//main.humidity
//wind.speed

// GIVEN a weather dashboard with form inputs





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
