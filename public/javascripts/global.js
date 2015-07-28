
$(document).ready(function() {

    populateMap();

});

// Functions =============================================================

// Fill table with data
function populateMap() {

    // Empty content string
    var tableContent = '';

    var from = 'SAVONA, ITALY';
    var to = 'CIVITAVECCHIA';
    var ship = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/points?from='+ from +'&to='+ to +'&ship='+ ship, function( data ) {

        // Stick our user data array into a userlist variable in the global object
        

        var coordinates = _.pluck(data, 'waypoint');

        var latlong = [];

        _.each(coordinates, function(el) {
            latlong.push(new google.maps.LatLng(parseFloat(el.lat), parseFloat(el.lng)))
        });

        var mapOptions = {
            zoom: 3,
            center: new google.maps.LatLng(0, 0),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

        var flightPlanCoordinates = latlong;

        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);
    });
};
