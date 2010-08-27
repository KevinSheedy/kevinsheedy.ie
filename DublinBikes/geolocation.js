var gl = null;
 
function displayPosition(position) {
  p = document.getElementById("p");
  p.innerHTML = "<table border='1'><tr><th>Timestamp</th><td>"+ position.timestamp +
  "<tr><th>Latitude (WGS84)</th><td>" + position.coords.latitude + " deg</td></tr>" +
  "<tr><th>Longitude (WGS84)</th><td>" + position.coords.longitude + " deg</td></tr></table>";
}
 
function displayError(positionError) {
  alert("error")
}
 
try {
  //if(navigator.userAgent.indexOf("Firefox")<0) {
  if(typeof(navigator.geolocation) == 'undefined'){
    gl = google.gears.factory.create('beta.geolocation');alert('using gears geolocation');
  } else {
    gl = navigator.geolocation;alert('native geolocation');
  }
}catch(e){alert("failed to create beta.geolocation");}
 
if (gl) {
  gl.getCurrentPosition(displayPosition, displayError);
} else {  
  alert("I'm sorry, but geolocation services are not supported by your browser.");  
}