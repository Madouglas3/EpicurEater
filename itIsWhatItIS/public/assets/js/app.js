$(".button-collapse").sideNav();

 $('.slider').slider({
 	indicators: false,
 	height: 550
 	});

$(function () {
 $(document).scroll(function () {
  var $nav = $(".nav-switch");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});


//--- Google Places Search Box ---
// This variable will be pre-programmed with our authentication key

var searchPlacesArray = [];
var searchPlacesImages = [];
var authKey = "AIzaSyDN6X3gZo6jEBL8xMZlRxKxrbW8wn0NhCg"; 


// These variables will hold the results we get from the user's inputs via HTML
var placesimg;
var map;

	google.maps.event.addDomListener(window, 'load', function () {
		var places = new google.maps.places.Autocomplete(document.getElementById('search'));
		google.maps.event.addListener(places, 'place_changed', function () {
			var place = places.getPlace();
			//console.log("This is value of place:..." + place); 
			var address = place.formatted_address;
			var placeid = place.place_id;
			var mesg = "Address:.." + address;
			mesg += "\nPlaceId:... " + placeid;
            //alert(mesg);
			//console.log("This is placeid:... " + placeid);
			$("#foodAndDrink").show(0,'', function(){
    			createPhotoMarker(place);
				initialize(place);    			
			});

		});
	}); //closes listener
	
	function createPhotoMarker(place) {
	  var photos = place.photos;
	  if (!photos) {
		return;
	  }

	  var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		title: place.name,
		icon: photos[0].getUrl({'maxWidth': 934, 'maxHeight': 550})
	  });
		console.log("This is the value of title:... " + place.name);
		console.log("This is the value of icon:... " + photos[0].getUrl({'maxWidth': 934, 'maxHeight': 550}));

		//creating and storing an image tag
		var cityImage = $("<img>");

		//adding attributes to the image tag 
		$('#cityimg').attr('src', photos[0].getUrl({'maxWidth': 934, 'maxHeight': 550}));

	} //closes createPhotoMarker


//retrieve Google Places 

var map;

	function initialize(place) {
	  // Create a map centered in SMU Dallas, TX.
	  map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
		zoom: 15
	  });

	  // Search for Food and Drink.
	  queryText = "Food and drink";
	  var request = {
		placeId: place.place_id,
		location: map.getCenter(),
		radius: '500',
		query: queryText + place.name,
		address: place.formatted_address
	  };

	  var service = new google.maps.places.PlacesService(map);

		service.textSearch(request, callback, place);

	} //closes initialize


// Callback processes results and checks that the PlacesServiceStatus is OK, and adds a marker
// using the place ID and location from the PlacesService.
	function callback(results, status, place) {
	  if (status == google.maps.places.PlacesServiceStatus.OK) {
		var marker = new google.maps.Marker({
		  map: map,
		  position: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}, 
		  place: {
			placeId: results[0].place_id,
			types: results[0].types,
			icon: results[0].photos[0].getUrl({'maxWidth': 183, 'maxHeight': 183}),
			title: results[0].name,
			address: results[0].address,
			rating: results[0].rating,
			phone: results[0].phone_number,
			website: results[0].website,
			review: results[0].reviews
			
		  }
		});
		var places = place;
		var photos = places.photos;
		//$("#fooddrink").empty();
		//$("#fooddrinkreviews").empty();

		for (i=0; i < results.length; i++) {		
			var placesAddress = results[i].formatted_address;

			console.log(results);
			console.log("********************************");
			console.log("This is the value of placeid:... " + results[i].place_id);
			console.log("This is the value of types:... " + results[i].types);
			console.log("This is the value of icon:... " + results[i].photos[0].getUrl({'maxWidth': 183, 'maxHeight': 183}));
			console.log("This is the value of title:... " + results[i].name);
			console.log("This is the value of address:... " + results[i].formatted_address);
			console.log("This is the value of Viewport Longitude:... " + results[i].geometry.viewport.b.b);
			console.log("This is the value of Viewport Latitude:... " + results[i].geometry.viewport.f.b);			
			console.log("This is the value of rating:... " + results[i].rating);
			console.log("This is the value of phone:... " + results[i].phone_number);
			console.log("This is the value of website:... " + results[i].website);
			console.log("This is the value of review:... " + results[i].reviews);
			console.log("********************************");

			$(".name").text(results[i].name).attr("class", "fancy");
			$(".address").html("<strong>Address: </strong>" + results[i].formatted_address);
			$(".rating").html("<strong>Rating: </strong>" + results[i].rating);


			if(results[i].opening_hours.open_now) {
				$(".hours").html("<strong>Open now:</strong> Yes");
			} else {
				$(".hours").html("<strong>Open now:</strong> No");
			}

//			$("<button>").

			
			if (results[i].rating > 4.1) {
				console.log("topicImageDiv");
				$("#foodReviews").empty();
				$("#foodReviews").append("Reviews go here");




			} //closes if
		} //closes for
	  } //closes if
	} //closes callback

//button click to write a review
//$("#writeReviewButton").on("click", function() {
//	what do you do???
// 
//      });


