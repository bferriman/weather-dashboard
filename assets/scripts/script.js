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
        buildCityButton(userCities[i]);
    }
}

function buildCityDiv(city){
    var newDiv = $("<div>");
    newDiv.text(city);
    newDiv.attr("id", city);
    return newDiv;
}

function showWeather(city){

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

    //display weather data for new city
    showWeather(city);

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
    //else display...something else?

    //create event listener for city submit button
    $("#city-submit").on("click", function(){
        event.preventDefault();
        var city = $("#city-input").val();
        $("#city-input").val("");  //clear input field

        //validate input
        //query API for city
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log("Current Weather Response:");
            console.log(response);
        });

        //query 5-day API
        queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log("Five Day Forecast Response:");
            console.log(response);
        });


        //if city is found, add city and show its weather data
        addCity(city);

        
    });
});