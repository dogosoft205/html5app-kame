var bookShelfDB;
function openDB() {
	var openResult = window.indexedDB.open("bookShelf", 1);
	openResult.addEventListener("success", function() {
		console.log("데이터베이스 오픈 성공 : " + this.result);
		bookShelfDB = this.result;
	});
	openResult.addEventListener("error", function() {
		console.log("데이터베이스 오픈 실패");
	});
	openResult.addEventListener("upgradeneeded", function() {
		console.log("데이터베이스 업그레이드 진행");
	});
}
openDB();