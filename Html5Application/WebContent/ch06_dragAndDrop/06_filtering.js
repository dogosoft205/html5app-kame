var lis = document.querySelectorAll(".menuItem");
var targets = document.querySelectorAll(".dropTarget");
var total = document.querySelector("#total");
var cnt = document.querySelector("#cnt");

// 이벤트 소스에서의 작업
for (var i = 0; i < lis.length; i++) {
	lis[i].addEventListener("dragstart", function(e) {
		e.dataTransfer.setData("text/plain", e.target.dataset.type);
		e.dataTransfer.setData("id", e.target.id);

		e.dataTransfer.effectAllowed = "copyMove";

	});
	lis[i].addEventListener("dragend", function() {
		cnt.innerHTML = total.children.length;
		for (var j = 0; j < targets.length; j++) {
			console.log(targets[j]);
			targets[j].style.background = "rgba(0, 0, 0, 0)";
		}
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
		switch (e.target.dataset.type) {
		case "drink":
			e.dataTransfer.dropEffect = "copy";
			break;
		case "meal":
			e.dataTransfer.dropEffect = "copy";
			break;
		case "dessert":
			e.dataTransfer.dropEffect = "move";
		}
	});
	targets[i].addEventListener("drop", function(e) {
		e.preventDefault();
		var id = e.dataTransfer.getData("id");
		var srctype = e.dataTransfer.getData("text/plain");

		var thistype = this.dataset.type;
		if (!id) {
			alert("이 요소는 드롭할 수 없습니다.");
		} else {
			if (!thistype || thistype == srctype) {
				this.appendChild(document.querySelector("#" + id));
			} else {
				alert(thistype + "에는 " + srctype + "을 담을 수 없습니다.");
			}
		}
		this.style.background = "rgba(0, 0, 0, 0)";
	});
}