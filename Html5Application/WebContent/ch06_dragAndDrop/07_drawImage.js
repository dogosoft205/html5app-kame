var lis = document.querySelectorAll(".menuItem");
var dish = document.getElementById("dish");
var ctx = dish.getContext("2d");

function drawDish() {
	var dishImg = new Image();
	dishImg.src = '../images/dish.png';
	dishImg.addEventListener("load", function() {
		ctx.drawImage(this, 0, 0);
	});
}
drawDish();

for (var i = 0; i < lis.length; i++) {
	lis[i].addEventListener("dragstart", function(e) {
		var dragSourceObj = {
			"type" : e.target.dataset.type,
			"id" : e.target.id,
			"soffsetX" : e.offsetX,
			"soffsetY" : e.offsetY
		};
		e.dataTransfer.setData("dragSource", JSON.stringify(dragSourceObj));

		e.dataTransfer.effectAllowed = "move";
	});
}

dish.addEventListener("dragenter", function(e) {
	this.style.background = "rgba(0, 255, 0, 0.5)";
});
dish.addEventListener("dragleave", function() {
	this.style.background = "rgba(0, 0, 0, 0)";
});
dish.addEventListener("dragover", function(e) {
	e.preventDefault();
	e.dataTransfer.dropEffect = "move";
});
dish.addEventListener("drop", function(e) {
	e.preventDefault();
	var dragSrcObj = JSON.parse(e.dataTransfer.getData("dragSource"));
	var id = dragSrcObj.id;
	var srctype = dragSrcObj.type;
	var thistype = this.dataset.type;
	if (!id) {
		alert("이 요소는 드롭할 수 없습니다.");
	} else {
		if (!thistype || thistype == srctype) {
			var x = e.offsetX - dragSrcObj.soffsetX;
			var y = e.offsetY - dragSrcObj.soffsetY;
			ctx.drawImage(document.getElementById(id), x, y);
		} else {
			alert(thistype + "에는 " + srctype + "을 담을 수 없습니다.");
		}
	}
	this.style.background = "rgba(0, 0, 0, 0)";
});