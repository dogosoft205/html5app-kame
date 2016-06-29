var storage = localStorage;

var body = document.querySelector("body");
var nameField = document.getElementById("name");
var colorField = document.getElementById("color");
var fontSizeField = document.getElementById("fontSize");

var defaultBackground = "#ffffff";
var defaultFontSize = 15;

document.getElementById("save").addEventListener("click", function() {
	var user = {
		name : nameField.value,
		color : colorField.value,
		size : fontSizeField.value
	};

	storage.setItem(nameField.value, JSON.stringify(user));
	updateUserInfo(nameField.value, colorField.value, fontSizeField.value);
});

document.getElementById("remove").addEventListener("click", function() {
	storage.removeItem(nameField.value);
	updateUserInfo("", defaultBackground, defaultFontSize);
});

document.getElementById("login").addEventListener("click", function() {
	var userStr = storage.getItem(nameField.value);
	if (userStr) {
		var userObj = JSON.parse(userStr);
		updateUserInfo(userObj.name, userObj.color, userObj.size);
	} else {
		updateUserInfo(nameField.value, defaultBackground, defaultFontSize);
	}
});

function updateUserInfo(id, color, size) {
	nameField.value = id;
	colorField.value = color;
	fontSizeField.value = size;
	body.style.background = color;
	body.style.fontSize = size + "px";
}

window.addEventListener("storage", function(e) {
	if (e.key == nameField.value) {
		var userObj = JSON.parse(e.newValue);
		updateUserInfo(userObj.name, userObj.color, userObj.size);
	}
});