var APIKey = "823016d80c8b85490616d6e0ed68f34a";
userCities = [];


function getLocation(){

}

function loadCities(){
    //get city array from localStorage
    var citiesStr = localStorage.getItem("cities");
    if(citiesStr !== null){
        userCities = JSON.parse(citiesStr);
    }
    //iterate through array, building divs for each city
    for(var i = 0; i < userCities.length; i++){
        $("#cities").append(buildCityDiv(userCities[i]));
    }
}

function buildCityDiv(city){
    var newDiv = $("<div>");
    newDiv.text(city);
    newDiv.attr("id", city);
    return newDiv;
}

function showWeather(city){
    console.log("Showing weather!");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    $.ajax( {
        url: queryURL,
        method: "GET",
        error: function(){
            $("#help-text").text("City Not Found");
        }
    }).then(function(response) {
        console.log("Current Weather Response:");
        console.log(response);
        addCity(city);      //These functions are here just so that they're not called if the first
        showForecast(city); //ajax call returns an error

        var temperature = response.main.temp;
        console.log("Temp (F): " + temperature);
        var humidity = response.main.humidity;
        console.log("Humidity: " + humidity);
        var wind = response.wind.speed;
        console.log("Wind spd: " + wind);
        var lon = response.coord.lon;
        var lat = response.coord.lat;

        queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax( {
            url: queryURL,
            method: "GET",
            error: function(){
                console.log("UV Index call failed");
            }
        }).then(function(response) {
            console.log(response);
            var uvIndex = response.value;
            console.log("UV Index: " + uvIndex);
        });
    });
}

function showForecast(city){
    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("Five Day Forecast Response:");
        console.log(response);

        for(var i = 0; i < 5; i++){
            timeIndex = i * 8 + 7;

            $("#forecast-temp-" + i).text(response.list[timeIndex].main.temp);
            $("#forecast-humidity-" + i).text(response.list[timeIndex].main.humidity);
            $("#forecast-date-" + i).text(response.list[timeIndex].dt_txt);
            var icon = response.list[timeIndex].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + ".png";
            $("#forecast-icon-" + i).attr("src", iconURL);

            var bgURL = "";

            switch(icon) {

                case "01d":
                case "01n":
                    bgURL = "assets/images/clear_sky.jpg";
                    break;

                case "02d":
                case "02n":
                    bgURL = "assets/images/partly_cloudy.jpg";
                    break;

                case "03d":
                case "03n":
                case "04d":
                case "04n":
                    bgURL = "assets/images/cloudy.jpg";
                    break;

                case "09d":
                case "09n":
                case "10d":
                case "10n":
                    bgURL = "assets/images/rain.jpg";
                    break;

                case "11d":
                case "11n":
                    bgURL = "assets/images/storm.jpg";
                    break;

                case "13d":
                case "13n":
                    bgURL = "assets/images/snow.jpg";
                    break;

                case "50d":
                case "50n":
                    bgURL = "assets/images/mist.jpg";
                    break;
            }

            $("#forecast-bg-" + i).attr("src", bgURL);
        }  //end for loop
        $("#carouselExampleIndicators").carousel(0);
    });
}

function addCity(city){
    //find existing matching city and remove from DOM and array
    for(var i = 0; i < userCities.length; i++){
        if(userCities[i] === city) {
            $("#" + city).remove();
            userCities.splice(i, 1);
        }
    }

    //add city to front of array  
    userCities.splice(0, 0, city);

    //build div and prepend to DOM
    newDiv = buildCityDiv(city);
    $("#cities").prepend(newDiv);

    //save updated userCities array to localStorage
    storeCities();
}

function storeCities(){
    localStorage.setItem("cities", JSON.stringify(userCities));
}


$(document).ready(function() {

    loadCities();

    //try to get the user's location

    //load user's current location if possible
    //else load most recently viewed city
    console.log(userCities[0]);
    if (userCities[0] === undefined){
        //what should we do here?
    }
    else {
        showWeather(userCities[0]);
        showForecast(userCities[0]);
    }
    //else display...something else?

    //create event listener for city submit button
    $("#city-submit").on("click", function(){
        event.preventDefault();
        var city = $("#city-input").val();
        $("#city-input").val("");  //clear input field

        //validate input

        //call showWeather, and capture bool return value (false for city not found)
        showWeather(city);
        //call showForecast, and capture bool return value

        //if city is found, add city and show its weather data

        
    });
});