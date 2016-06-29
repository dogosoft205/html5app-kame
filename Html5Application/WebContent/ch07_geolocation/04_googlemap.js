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
var method = document.getElementById("method");
var geolocation = navigator.geolocation;

function success(position) {
	var coords = position.coords;
	var date = new Date(position.timestamp);
	var data;
	if (coords.accuracy > 100) {
		data = [ "", "", "", "부정확한 자료(" + coords.accuracy + ")" ];
	} else {
		data = [ coords.latitude.toFixed(3), coords.longitude.toFixed(3),
				coords.accuracy.toFixed(3), "" ];
		eval(method.value + "(" + data[0] + "," + data[1] + ")");
	}
	latitude.value = data[0];
	longitude.value = data[1];
	accuracy.value = data[2];
	errorMessage.innerHTML = data[3];
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
	errorMessage.innerHTML = msg;
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
	errorMessage.innerHTML = "";
	for (var i = 0; i < tds.length; i++) {
		tds[i].value = "";
	}
}

// 기본 맵
function initBaseMap(latitude, longitude) {
	var map = new google.maps.Map(document.querySelector("#map"), {
		center : {
			lat : latitude,
			lng : longitude
		},
		scrollwheel : true,
		zoom : 15
	});
}

// 위성 맵
function initSatliteMap(latitude, longitude) {
	var map = new google.maps.Map(document.getElementById('map'), {
		center : {
			lat : latitude,
			lng : longitude
		},
		mapTypeId : google.maps.MapTypeId.SATELLITE,
		scrollwheel : true,
		zoom : 15
	});
}
// 마커의 사용
function initMarkerMap(latitude, longitude) {
	var myLatLng = {
		lat : latitude,
		lng : longitude
	};

	var map = new google.maps.Map(document.getElementById('map'), {
		center : myLatLng,
		scrollwheel : true,
		zoom : 15
	});

	var marker = new google.maps.Marker({
		map : map,
		position : myLatLng,
		title : '내 위치!'
	});
}

// PlacesService 사용
function initializePlace(latitude, longitude) {
	// 사용할 좌표를 이용해 pyrmont 생성
	var myLatLng = new google.maps.LatLng(latitude, longitude);

	// 맵의 기본 속성 설정
	var map = new google.maps.Map(document.getElementById('map'), {
		center : myLatLng,
		scrollwheel : true,
		zoom : 15
	});

	// 정보 요청을 위한 요청 작성
	var request = {
		location : myLatLng,
		radius : '500',
		types : [ 'hospital', 'school', 'food' ]
	};

	// PlacesService 객체 획득
	var service = new google.maps.places.PlacesService(map);
	// PlacesService에 request를 넘겨주면 results에 정보가 넘어옴
	service.nearbySearch(request, function(results, status) {
		// 상태가 OK로 넘어왔을 때 마커를 통해 정보를 화면에 표시
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				var place = results[i];
				var marker = new google.maps.Marker({
					map : map,
					position : place.geometry.location,
					title : place.name
				});
			}
		}
	});
}