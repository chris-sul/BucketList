var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

var otherPoints = [];

function addLoc(){
  var place = prompt("Name of the Location:");
  if(place == ""){
    alert("Invalid Entry");
  } else {
  //var object = {location:place,stopover:true};
  //otherPoints.push(object);
  $("#extraLocations").append("<li class='listLi' draggable='true' ondragstart='dragStarted(event)' ondragover='draggingOver(event)' ondrop='dropped(event)'>"+place+"</li>");
}
}

function readlist(){
  otherPoints = [];
  var temps = [];
  $('li').each(function() {
    temps.push(this.innerHTML);
  })
  if (temps.length > 2){
    temps = temps.splice(2);
    for(var i=0;i<temps.length;i++){
      var object = {location:temps[i],stopover:true};
      otherPoints.push(object);
    }
}
}

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom:7,
    center: chicago
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  directionsDisplay.setMap(map);
  $("#directionsPanel").empty();
  $("#directionHeader").empty();
  $("#directionHeader").append("<b>Directions:</b>");
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
  $("#goodTrip").empty();
  $("#goodTrip").append("<img src='road.jpg' height='336' width='600'><br>");
}

function calcRoute() {
  //read the items in the panel
  readlist();

  var start = $('#inputStart').val();
  var end = $('#inputFinish').val();
  var request = {
    origin:start,
    destination:end,
    waypoints:otherPoints,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

function makeRoute(){
  initialize();
  calcRoute();
}

var source;

      function dragStarted(evt){
      //start drag
      source=evt.target;
      //set data
      evt.dataTransfer.setData("text/plain", evt.target.innerHTML);
      //specify allowed transfer
      evt.dataTransfer.effectAllowed = "move";
      }

      function draggingOver(evt){
      //drag over
      evt.preventDefault();
      //specify operation
      evt.dataTransfer.dropEffect = "move";
      }

      function dropped(evt){
      //drop
      evt.preventDefault();
      evt.stopPropagation();
      //update text in dragged item
      source.innerHTML = evt.target.innerHTML;
      //update text in drop target
      evt.target.innerHTML = evt.dataTransfer.getData("text/plain");
      }

$( document ).ready(function() {
    console.log( "ready!" );
});