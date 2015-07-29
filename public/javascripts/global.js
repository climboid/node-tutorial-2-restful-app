
$(document).ready(function() {
	//populateMap();
	getCombinations();
});


function getCombinations() {
	$.getJSON('/points/combinations', function(data) {
		_.each(data.ports, function(el, index){
			var obj = { originPort : el.origin }
			_.each(el.destination, function(item, subindex) {
				obj.destinationPort = item;
				obj.canvasId = index+subindex;
				generateManyMaps(obj);
			});
		});
	});
}

function generateManyMaps(obj) {
	$.getJSON( '/points?originPort='+ obj.originPort +'&destinationPort='+ obj.destinationPort, function( data ) {
		console.log(obj);
		var coordinates = _.pluck(data, 'waypoint');

		var latlong = [];

		_.each(coordinates, function(el) {
			latlong.push(new google.maps.LatLng(parseFloat(el.lat), parseFloat(el.lng)))
		});

		var mapOptions = {
			zoom: 6,
			center: new google.maps.LatLng(parseFloat(coordinates[0].lat),parseFloat(coordinates[0].lng)),
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			avoidFerries: true
		};

		var sliced = [latlong[0], latlong[latlong.length/2], latlong[latlong.length-1]];

		var map = new google.maps.Map(document.getElementById('map-canvas'+obj.canvasId), mapOptions);

		var flightPlanCoordinates = latlong;

		var flightPath = new google.maps.Polyline({
			path: flightPlanCoordinates,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeWeight: 2
		});

		flightPath.setMap(map);
	});
}


function populateMap() {

	var originPort = 'LANZAROTE, SPAIN';
	var destinationPort = 'PALAMOS';
	var ship = '';
	var originCall = "";
	var destinationCall = ""

	$.getJSON( '/points?originPort='+ originPort +'&destinationPort='+ destinationPort +'&ship='+ ship +'&originCall='+ originCall +'&destinationCall='+destinationCall, function( data ) {

		var coordinates = _.pluck(data, 'waypoint');

		console.log(coordinates)

		var latlong = [];

		_.each(coordinates, function(el) {
			latlong.push(new google.maps.LatLng(parseFloat(el.lat), parseFloat(el.lng)))
		});

		var x = parseFloat(coordinates[Math.round(coordinates.length/2)].lat);
		var y = parseFloat(coordinates[Math.round(coordinates.length/2)].lng);
		

		var mapOptions = {
			zoom: 5,
			center: new google.maps.LatLng(x,y),
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			avoidFerries: true
		};

		var sliced = [latlong[0], latlong[latlong.length/2], latlong[latlong.length-1]];

		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		var flightPlanCoordinates = latlong;
		// var flightPlanCoordinates = sliced;

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
