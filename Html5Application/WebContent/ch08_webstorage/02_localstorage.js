var storage = localStorage;

var body = document.querySelector("body");
var nameField = document.getElementById("name");
var colorField = document.getElementById("color");
var fontSizeField = document.getElementById("fontSize");

var defaultBackground = "#ffffff";
var defaultFontSize = 15;

document.getElementById("save").addEventListener("click", function() {
	storage.setItem("name", nameField.value);
	storage.setItem("fcolor", colorField.value);
	storage.setItem("fsize", fontSizeField.value);
	updateUserInfo(nameField.value, colorField.value, fontSizeField.value);
});

document.getElementById("remove").addEventListener("click", function() {
	storage.clear();
	updateUserInfo("", defaultBackground, defaultFontSize);
});

function updateUserInfo(id, color, size) {
	nameField.value = id;
	colorField.value = color;
	fontSizeField.value = size;
	body.style.background = color;
	body.style.fontSize = size + "px";
}

function init() {
	var name = storage.getItem("name");
	if (name) {
		updateUserInfo(name, storage.getItem("fcolor"), storage
				.getItem("fsize"));
	} else {
		updateUserInfo("", defaultBackground, defaultFontSize);
	}
}

init();