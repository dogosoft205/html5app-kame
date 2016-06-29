var bookShelfDB;
function openDB() {
	var openResult = window.indexedDB.open("bookShelf", 2);
	openResult.addEventListener("success", function() {
		console.log("데이터베이스 오픈 성공 : " + this.result);
		bookShelfDB = this.result;
		showDatabaseInfo(bookShelfDB);
	});
	openResult.addEventListener("error", function() {
		console.log("데이터베이스 오픈 실패");
	});
	openResult.addEventListener("upgradeneeded", function() {
		console.log("데이터베이스 업그레이드 진행");
		bookShelfDB = this.result;
		if (bookShelfDB.objectStoreNames.contains("books")) {
			bookShelfDB.deleteObjectStore("books");
		}
		bookShelfDB.createObjectStore("books", {
			keyPath : "isbn",
			autoIncrement : true
		});
	});
}
openDB();

function showDatabaseInfo(db) {
	console.log("이름: " + db.name, "버전: " + db.version);

	console.log("ObjectStore 개수: " + db.objectStoreNames.length);
	for (var i = 0; i < db.objectStoreNames; i++) {
		console.log(i + " : " + db.objectStoreNames[i]);
	}
}