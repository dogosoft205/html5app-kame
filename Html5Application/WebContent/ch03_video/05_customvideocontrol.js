/* 변수의 선언*/
var container = document.getElementById("container")
var controller = document.getElementById("controller");
var video = document.getElementById("video");
var play = document.getElementById("play");
var current = document.getElementById("current");
var seek = document.getElementById("seek");
var mute = document.getElementById("mute");
var volume = document.getElementById("volume");
var fullScreen = document.getElementById("fullScreen");

/* container에서의 이벤트 처리 */
container.addEventListener("mouseover", function() {
	controller.style.display = "flex";
});

container.addEventListener("mouseout", function() {
	controller.style.display = "none";
});

/* video에서의 이벤트 처리 */
video.addEventListener("canplay", function() {
	seek.max = this.duration;
});

video.addEventListener("timeupdate", function(e) {
	seek.value = this.currentTime;
	updateTime(this.currentTime);
});

video.addEventListener("ended", function() {
	play.innerHTML = "재생";
	seek.value = 0;
	video.currentTime = 0;
	updateTime(0);
});

/* play 이벤트 처리 */
play.addEventListener("click", function() {
	if (video.paused || video.ended) {
		video.play();
		this.innerHTML = "일시정지";
	} else {
		video.pause();
		this.innerHTML = "재생";
	}
});

/* seek 이벤트 처리 */
seek.addEventListener("click", function(e) {
	var newTime = video.duration * e.offsetX / this.offsetWidth;
	seek.value = newTime;
	video.currentTime = newTime;
});

seek.addEventListener("mousedown", function() {
	video.pause();
});

seek.addEventListener("input", function() {
	video.currentTime = seek.value;
	updateTime(seek.value);
});

seek.addEventListener("mouseup", function() {
	if (play.innerHTML == "일시정지") {
		video.play();
	}
});

/* 음소거 관련 기능 */
mute.addEventListener("click", function() {
	video.muted = !video.muted;
	if (video.muted) {
		mute.innerHTML = "음재생";
	} else {
		mute.innerHTML = "음소거";
	}
});

/* volume 조절 기능 */
volume.addEventListener("input", function(e) {
	video.volume = this.value;
});

/* 전체화면 */
fullScreen.addEventListener("click", function() {
	container.reqFullScreen = container.requestFullScreen
			|| container.mozRequestFullScreen
			|| container.webkitRequestFullscreen
			|| container.msRequestFullscreen;
	container.reqFullScreen();
	container.style.width = "100%";

});

// Webkit
document.addEventListener("webkitfullscreenchange", function() {
	if (!document.webkitIsFullScreen) {
		container.style.width = "640px";
	}
});

// Firefox
document.addEventListener("mozfullscreenchange", function() {
	if (!document.mozIsFullScreen) {
		container.style.width = "640px";
	}
});

// Explorer
document.addEventListener("MSFullscreenChange", function() {
	if (!document.msFullscreenElement) {
		container.style.width = "640px";
	}
});

/* 시간 업데이트 함수 */
function updateTime(time) {
	var date = new Date(1000 * time);
	var m = date.getMinutes();
	var s = date.getSeconds();
	current.innerHTML = (m<=9?"0"+m:m)+":"+(s<=9?"0"+s:s);
	
/*	//Microsoft 계열에서는 minute, second를 제대로 표현하지 못하는 버그가 있음
	current.innerHTML = new Intl.DateTimeFormat("ko-KR", {
		minute : "numeric",
		second : "numeric"
	}).format(date);*/
}
