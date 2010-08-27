if(typeof(window.dublinBikes) == "undefined"){
	window.dublinBikes = {};
	window.dublinBikes.liveStationData = {};
	window.dublinBikes.trackerEnabled = true;
	window.dublinBikes.myCoords = {};
	window.dublinBikes.myLatLng = {};
	window.dublinBikes.stationNames = {};
}

$(document).ready(function(){
	$.get("carto.xml", "", initStations);
	updateliveStationData();
	setInterval("updateliveStationData()", 5000);
	
	var watchID = navigator.geolocation.watchPosition(function(position) {
		positionChanged(position);
	});
	
	

});

var clickedMarker;

function showStation(stationId){
	var msg = dublinBikes.stationNames[stationId]
			+ "\nBikes: "  + dublinBikes.liveStationData[stationId].bikes
			+ "\nSpaces: " + dublinBikes.liveStationData[stationId].spaces;
	alert(msg);
	
	/*
	var infowindow = new google.maps.InfoWindow({
		content: msg
	});
	
	infowindow.open(map, clickedMarker);
	*/
	
}

function initStations(responseXML){
	

	$(responseXML).find("marker").each(function() {
		var marker = $(this);
		var stationName   = marker.attr("name");
		var stationNumber = marker.attr("number");
		
		dublinBikes.stationNames[stationNumber] = stationName;
		
		var image = 'bike.png';
		var myLatLng = new google.maps.LatLng(marker.attr("lat"), marker.attr("lng"));
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			name: marker.attr("number")/*,
			icon: image*/
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			clickedMarker = marker;
			showStation(marker.name);
		});
	});
}


function handleButtonClick(){
	updateliveStationData();
	
}

function updateliveStationData(){
	//alert("doUpdate()");
	$.getJSON("liveStationData.js", function(json){
		//alert("updated live station data");
		window.dublinBikes.liveStationData = json;
	});
}


function positionError(err) {
	var msg;
	switch(err.code) {
		case err.UNKNOWN_ERROR:
			msg = "Unable to find your location";
			break;
		case err.PERMISSION_DENINED:
			msg = "Permission denied in finding your location";
			break;
		case err.POSITION_UNAVAILABLE:
			msg = "Your location is currently unknown";
			break;
		case err.BREAK:
			msg = "Attempt to find location took too long";
			break;
		default:
		msg = "Location detection not supported in browser";
	}
	document.getElementById('info').innerHTML = msg;
}

function positionChanged(position) {
	// Centre the map on the new location
	dublinBikes.myPosition = position;
	dublinBikes.myCoords = position.coords || position.coordinate || position;
	dublinBikes.myLatLng = new google.maps.LatLng(dublinBikes.myCoords.latitude, dublinBikes.myCoords.longitude);
	
	if(dublinBikes.trackerEnabled == true){
		centerOnMyLocation()
	}
	if(typeof(dublinBikes.myLocationMarker) == "undefined")
	{
		dublinBikes.myLocationMarker = new google.maps.Marker({
			map: map,
			position: dublinBikes.myLatLng,
			title: 'Why, there you are!',
			icon: "graphics/myLocation.png"
		});
	}
	dublinBikes.myLocationMarker.setPosition(dublinBikes.myLatLng);
}

function centerOnMyLocation(){
	map.setCenter(dublinBikes.myLatLng);
}

function enableTracker(){
	dublinBikes.trackerEnabled = true;
	$("#trackerToggle").attr("src", "graphics/trackerEnabled.png");
	centerOnMyLocation();
}

function disableTracker(){
	dublinBikes.trackerEnabled = false;
	$("#trackerToggle").attr("src", "graphics/trackerDisabled.png");
}

function toggleTracker(){
	if(dublinBikes.trackerEnabled){
		disableTracker();
	}
	else{
		enableTracker();
	}
}

function handleButtonClick(){
	
	var bikesImage = new google.maps.MarkerImage(
		"graphics/numbersGreenLarge.png",
		// This marker is 20 pixels wide by 32 pixels tall.
		new google.maps.Size(40, 32),
		// The origin for this image is 0,0.
		new google.maps.Point(430,0),
		new google.maps.Point(16, 32));
	
	var spacesImage = new google.maps.MarkerImage(
		"graphics/7Small.png",
		"",
		"",
		new google.maps.Point(8, -8));



	var latLngOConnellBridge = new google.maps.LatLng(53.347247,-6.2593);
	var bikesMarker = new google.maps.Marker({
		map: map,
		position: latLngOConnellBridge,
		title: 'Why, there you are!',
		icon: bikesImage,
		shadow: spacesImage
	});
	//alert("using MarkerImage");
	/*
	var myMarker = new google.maps.Marker({
		map: map,
		position: latLngOConnellBridge
	});
	*/
	
}

