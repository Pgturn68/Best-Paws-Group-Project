// Mobile Menu Function
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle("is-active");
});

// When Document is ready, THEN load Functions
$(document).ready(function () {
    // YouTube API
    var key = "AIzaSyBFYMCr4d7lc-uj2-cNh3daGOJOgmnnL50";
    var playlistId = "PL_lgr1_NiQp8-w1mwUVkA1Y55EMmbit_J";
    // HTTP Request URL
    var URL = "https://www.googleapis.com/youtube/v3/playlistItems";
    // Response from API, specified in YouTube API Documentation
    var options = {
        part: "snippet",
        key: key,
        maxResults: 5,
        playlistId: playlistId
    }
    // Calling the Function
    loadVids();
    // Request sent with jQuery returning the function of "data"
    function loadVids() {
        $.getJSON(URL, options, function (data) {
            console.log(data)
            var id = data.items[0].snippet.resourceId.videoId;
            // Make API Call then Load mainVid
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        // ` Allows the use of Variables directly into the String -- Looking for $variable(id)
        $("#video").html(`
			<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
			`);
    }

	// Loop through Items Array and Add Another Video
    function resultsLoop(data) {
    // For Each Data Item
    $.each(data.items, function (i, item) {
        // Variables Displayed for Thumbnail Looped Videos
        var thumb = item.snippet.thumbnails.medium.url;
        var title = item.snippet.title;
        var desc = item.snippet.description.substring(0, 150); // Up to 100 Characters
        var vid = item.snippet.resourceId.videoId; // videoId from Console Log

        $("main").append(`
			<article class="item" data-key="${vid}">

			<img src="${thumb}" alt="" class="thumb">
			<div class="details">
				<h4>${title}</h4>
				<p>${desc}</p>
			</div>
            </article>
	        `);
        });
    }

	// Click Event for Article Videos
    $("main").on("click", "article", function () {
        var id = $(this).attr("data-key"); // Selects "data-key" which is individual per Video
        mainVid(id); // Sends Thumb video to "Main"
    });


// GeoLocation API -- Permission Panel Asking User for Actual Position/Location
const successCallback = (position) => {
    console.log(position);
};
// If Permission is Denied, Unavailable or Timeout
const errorCallback = (error) => {
    console.error(error);
};
// Allows Updates as Users Position Changes
const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);

// Dog Parks Array (using the Shortcut for a New Array = [] in scope)
var parks = [];
  $("#auto-complete").on("click", function (event) {
    $("#display-results").empty();
    parks = [];
    let zipCode = $("#zip-input").val();
    // Map Quest API -- Pulls information from Parameters
    var mapquestQuery = "https://www.mapquestapi.com/geocoding/v1/address?key=d5gSCP90yDE05j7pqKiqfVqbC53mLpmC&location=" + zipCode
    // Calling Latitude and Longitude for given zipCode

    $.ajax({
        url: mapquestQuery,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        let lat = (response.results[0].locations[0].displayLatLng.lat);
        let lon = (response.results[0].locations[0].displayLatLng.lng);
        var weatherQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9252538e0cdc637a6781b199ba8f3ff7";
     
    // Second Call Posting Weather into Console
    $.ajax({
        url: weatherQuery,
        method: "GET"
    }).then(function (response) {
        console.log(response)
    });
    });
    });
});

/*
// Dogs API
$("#search-btn").click(function(event){
    event.preventDefault();

    var breedSearch = $("#breed-search").val().trim();

    var queryURL = "https://api.thedogapi.com/v1/breeds/search?q=" + breedSearch

    // ajax Request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("results-container").empty();

        // Result Variables
        var name = response.name;
        var weight = response.weight.imperial;
        var height = response.height.imperial;
        var bred_for = response.bred_for;
        var life_span = response.life_span;
        var temperament = response.temperament;

        // Results appearing on HTML
        var html_results = $("<h6>").html(
            "Name: " + name + "<br>" +
            "Weight: " + weight + "<br>" +
            "Height: " + height + "<br>" +
            "Bred for: " + bred_for + "<br>" +
            "Life span: " + life_span + "<br>" +
            "Temperament: " + temperament + "<br>"
        );

        console.log(html_results);

        var result_image = $("<img>").attr("src", image).addClass("result-image")

        $("#results-container").append(html_results, result_image);

    });

});

// Modal Function
$(document).on("click", function () {
    breedIndex = $(this).data("dogs");
    $(".modal-content").empty();
    let breedArray = dogsArray[breedIndex].breeds;
    console.log(breedArray)
    
    breedArray.forEach((breeds, index) => {
        let nameDiv = $(`<div class="has-text-centered box mx-1 px-1" id="rest-${index}">`)
     
        $(dogsDiv).append(nameDiv)
        $(".modal-content").append(dogsDiv)
    });
    $(".modal").addClass("is-active");
});

    $(".modal-close").on("click", function () {
        $(".modal").removeClass("is-active");
});
*/




/*

// Google API -- Autofills Data from the User Defined Input
let autoComplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
        types: ["establishment"],
        componentRestrictions: {"country": ["US"]},
        fields: ["place_id", "geometry", "name"]
        });
}

$.ajax({
    url: `//jsfiddle.net/adenF/3g9j1h8d/embed/"`,
    method: "GET",
    headers: {
    "user-key": "9985c76101ef1e92d780985a8cd4065f",           
}

*/

/*
    // Modal for Retrieving Local Coffee Shops
    $(document).on("click", "a.coffee", function () {
        cofIndex = $(this).data("coffee");
        $(".modal-content").empty();
        let cofArray = coffeeArray[cofIndex].coffee;
        console.log(cofArray)
        // Modal Information for the Local Coffee Shops including Link, Address and Average Cost
        cofArray.forEach((coffee, index) => {
        let coffeeDiv = $(`<div class="has-text-centered box" id="cof-${index}">`) 
        let coffeeLink= $(`<a id="a-${index}" class="mb-1" target="_blank" href= ${JSON.stringify(shops.coffee.url)}>${JSON.stringify(shops.coffee.name)}</a></br>`)
        let coffeeLoc = $(`<p>${JSON.stringify(shops.coffee.location.address)}</p>`)
        let costForTwo = $(`<p class="mb-4">Cost for 2: $${JSON.stringify(shops.coffee.average_cost_for_two)}</p>`) 
        $(coffeeDiv).append(coffeeLink, coffeeLoc, costForTwo)
        $(".modal-content").append(coffeeDiv)
    });
        // Appears after Click from Line 39
        $(".modal").addClass("is-active");
    });
    // Closes Modal on Click
    $(".modal-close").on("click", function () {
        $(".modal").removeClass("is-active");
    });


    // Loads DOM before the Function
    $(document).ready(function () {
  
    // Dog Parks Array (using the Shortcut for a New Array = [] in scope)
    var parksArray = [];
    $("#autocomplete").on("click", function (event) {
        $("#results").empty();
        parksArray = [];
        let zipCode = $("#zip-input").val();
        // Map Quest API -- Pulls information from Parameters
        var mapQuery = "https://www.mapquestapi.com/geocoding/v1/address?key=d5gSCP90yDE05j7pqKiqfVqbC53mLpmC&location=" + zipCode
     
        // Calling Latitude and Longitude for given zipCode
        $.ajax({
            url: mapQuery,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            // Loop to Display
            for (let i = 0; i < 7; i++) {
                parksArray.push(response.parksArray[i]);
        }
    });
  });
});
*/

// var mapQuery = "https://www.mapquestapi.com/geocoding/v1/address?key=d5gSCP90yDE05j7pqKiqfVqbC53mLpmC&location=" + zipCode