var lis = document.querySelectorAll(".menuItem");
var targets = document.querySelectorAll(".dropTarget");

for (var i = 0; i < lis.length; i++) {
	lis[i].addEventListener("dragstart", function(e) {
		printDataTransferContent("data 설정 전", e.dataTransfer);

		e.dataTransfer.setData("text/plain", e.target.dataset.type);
		e.dataTransfer.setData("id", e.target.id);

		printDataTransferContent("data 설정 후", e.dataTransfer);
	});
	lis[i].addEventListener("drag", function() {
		// console.log("drag event");
	});
	lis[i].addEventListener("dragend", function() {
		console.log("dragend  event");
	});
}

for (var i = 0; i < targets.length; i++) {
	targets[i].addEventListener("dragenter", function(e) {
		console.log("drag enter event");
	});
	targets[i].addEventListener("dragleave", function() {
		console.log("dragleave event");
	});
	targets[i].addEventListener("dragover", function(e) {
		e.preventDefault();
		// console.log("dragover event");
	});
	targets[i].addEventListener("drop", function(e) {
		e.preventDefault();
		var id = e.dataTransfer.getData("id");
		var type = e.dataTransfer.getData("text/plain");
		console.log("데이터 수신 확인 : " + id + ", " + type);
		this.appendChild(document.querySelector("#" + id));
	});
}

function printDataTransferContent(when, dt) {
	console.log(when);
	var formats = dt.types;
	for (var j = 0; j < formats.length; j++) {
		console.log(j + " : " + formats[j] + " : " + dt.getData(formats[j]));
	}
}