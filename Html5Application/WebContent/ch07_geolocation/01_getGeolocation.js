var timeout = document.getElementById("timeout");
var maximumAge = document.getElementById("maximumAge");
var enableHighAccuracy = document.getElementById("enableHighAccuracy");
var timestame = document.getElementById("timestamp");
var latitude = document.getElementById("latitude");
var longitude = document.getElementById("longitude");
var accuracy = document.getElementById("accuracy");
var errorMessage = document.getElementById("errorMessage");
var tds = document.querySelectorAll(".refresh");
var getLocationB = document.getElementById("getLocation");
var traceLocationB = document.getElementById("traceLocation");
var stopTraceB = document.getElementById("stopTrace");
var cnt = document.getElementById("cnt");

var geolocation = navigator.geolocation;

console.log(geolocation);
function success(position) {
	var coords = position.coords;
	var date = new Date(position.timestamp);
	timestame.value = date.toLocaleString();
	latitude.value = coords.latitude;
	longitude.value = coords.longitude;
	accuracy.value = coords.accuracy;
	errorMessage.value = "";
	cnt.innerHTML = parseInt(cnt.innerHTML) + 1;
}

function error(positionError) {
	var msg;
	switch (positionError.code) {
	case 1:
		msg = "사용자가 권한 부여를 거부하였습니다.";
		break;
	case 2:
		msg = "내부 오류로 위치 정보를 가져오지 못하였습니다.";
		break;
	case 3:
		msg = "Timeout 초과로 정보를 가져오지 못하였습니다.";
	}
	errorMessage.value = msg;
}

getLocationB.addEventListener("click", function() {
	var options = {
		enableHighAccuracy : enableHighAccuracy.checked,
		timeout : timeout.value * 1000,
		maximumAge : maximumAge.value * 1000
	};
	refreshFields();
	geolocation.getCurrentPosition(success, error, options);
});

function refreshFields() {
	cnt.innerHTML = 0;
	for (var i = 0; i < tds.length; i++) {
		tds[i].value = "";
	}
}