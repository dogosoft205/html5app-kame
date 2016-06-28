var lis = document.querySelectorAll(".menuItem");
var targets = document.querySelectorAll(".dropTarget");
var total = document.getElementById("total");
var cnt = document.getElementById("cnt");

// 드래드 소스에서의 작업
for (var i = 0; i < lis.length; i++) {
	lis[i].addEventListener("dragstart", function(e) {
		e.dataTransfer.setData("text/plain", e.target.dataset.type);
		e.dataTransfer.setData("id", e.target.id);
	});
	lis[i].addEventListener("dragend", function() {
		cnt.innerHTML = total.children.length;
	});
}

// 드롭 목적지에서의 작업
for (var i = 0; i < targets.length; i++) {
	targets[i].addEventListener("dragenter", function(e) {
		this.style.background = "rgba(0, 255, 0, 0.5)";
	});
	targets[i].addEventListener("dragleave", function() {
		this.style.background = "rgba(0, 0, 0, 0)";
	});
	targets[i].addEventListener("dragover", function(e) {
		e.preventDefault();
	});
	targets[i].addEventListener("drop", function(e) {
		e.preventDefault();
		var id = e.dataTransfer.getData("id");
		var type = e.dataTransfer.getData("text/plain");
		this.appendChild(document.querySelector("#" + id));
		this.style.background = "rgba(0, 0, 0, 0)";
	});
}