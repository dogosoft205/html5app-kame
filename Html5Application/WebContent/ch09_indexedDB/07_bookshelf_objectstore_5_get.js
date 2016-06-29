var bookShelfDB;
function openDB() {
	var openResult = window.indexedDB.open("bookShelf", 2);
	openResult.addEventListener("success", function() {
		console.log("데이터베이스 오픈 성공 : " + this.result);
		bookShelfDB = this.result;
		showDatabaseInfo(bookShelfDB);
		updateISBNList();
	});
	openResult.addEventListener("error", function() {
		console.log("데이터베이스 오픈 실패");
		console.log(this.result);
	});
	openResult.addEventListener("upgradeneeded", function() {
		console.log("데이터베이스 업그레이드 진행");
		bookShelfDB = this.result;
		if (bookShelfDB.objectStoreNames.contains("books")) {
			bookShelfDB.deleteObjectStore("books");
		}
		var objStore = bookShelfDB.createObjectStore("books", {
			keyPath : "isbn",
			autoIncrement : true
		});
	});
}
openDB();

function showDatabaseInfo(db) {
	console.log("데이터베이스 이름: " + db.name, "버전: " + db.version);

	console.log("ObjectStore 개수: " + db.objectStoreNames.length);
	for (var i = 0; i < db.objectStoreNames; i++) {
		console.log(i + " : " + db.objectStoreNames[i]);
	}
}

var title = document.getElementById("title");
var year = document.getElementById("year");
var category = document.getElementById("category");
var isbn = document.getElementById("isbn");
var dashboard = document.getElementById("dashboard");

document.getElementById("registerB").addEventListener("click", function() {
	dashboard.innerHTML = "";
	var data = {
		title : title.value,
		year : year.value,
		category : category.value
	};
	if (isbn.value) {
		data.isbn = Number.parseInt(isbn.value);
	}
	var tx = bookShelfDB.transaction([ "books" ], "readwrite");
	showTransactionInfo(tx);

	tx.addEventListener("complete", function() {
		dashboard.innerHTML += "트랜잭션이 종료<br>";
	});
	tx.addEventListener("abort", function() {
		dashboard.innerHTML += "트랜잭션이 취소<br>";
	});
	tx.addEventListener("error", function() {
		dashboard.innerHTML += "트랜잭션이 실패<br>";
	});
	var objStore = tx.objectStore("books");
	showObjectStoreInfo(objStore);
	var request = objStore.put(data);
	request.addEventListener("success", function() {
		dashboard.innerHTML += "자료 저장 성공" + JSON.stringify(data) + "<br>";
		updateISBNList();
	});
	request.addEventListener("error", function() {
		dashboard.innerHTML += "자료 저장 실패<br>";
	});
	// tx.abort();
});

function showTransactionInfo(tx) {
	console.log("Transaction 정보 " + "소속 DB :" + tx.db + ", 모드 : " + tx.mode);
	console.log("연동되는 ObjectStore 정보", tx.objectStoreNames);
	console.log("Transaction 정보 출력 종료------------------------------");
}

function showObjectStoreInfo(os) {
	console.log("ObjectStore 정보", "이름: " + os.name);
	console.log("자동완성 컬럼 보유 여부 : " + os.autoIncrement);
	console.log("키패스 : ", os.keyPath);
	console.log("인덱스 정보: ", os.indexNames);
	console.log("ObjectStore 정보 출력 종료-------------------------------");
}

var datas = document.getElementById("datas");
function updateISBNList() {
	dashboard.innerHTML = "";
	var tx = bookShelfDB.transaction([ "books" ], "readonly");

	var objStore = tx.objectStore("books");
	var request = objStore.getAllKeys();
	request.addEventListener("success", function() {
		datas.innerHTML = "";
		for (var i = 0; i < request.result.length; i++) {
			datas.innerHTML += "<option>" + request.result[i];
		}
		dashboard.innerHTML += "목록 업데이트 성공";
	});
	request.addEventListener("error", function() {
		dashboard.innerHTML += "목록 업데이트 실패<br>";
	});
}

document.getElementById("getAllB").addEventListener("click", function() {
	dashboard.innerHTML = "";
	var tx = bookShelfDB.transaction([ "books" ], "readonly");

	var objStore = tx.objectStore("books");
	var request = objStore.getAll();
	request.addEventListener("success", function() {
		dashboard.innerHTML = "";
		for (var i = 0; i < request.result.length; i++) {
			dashboard.innerHTML += JSON.stringify(request.result[i]) + "<br>";
		}
	});
	request.addEventListener("error", function() {
		dashboard.innerHTML += "자료 조회 실패<br>";
	});
});

document.getElementById("searchB").addEventListener("click", function() {
	var tx = bookShelfDB.transaction([ "books" ], "readonly");

	var objStore = tx.objectStore("books");
	var request = objStore.get(Number.parseInt(datas.value));
	request.addEventListener("success", function() {
		dashboard.innerHTML = "자료 조회 성공";
		var data = this.result;
		title.value = data.title;
		isbn.value = data.isbn;
		year.value = data.year;
		category.value = data.category;
	});
	request.addEventListener("error", function() {
		dashboard.innerHTML += "자료 조회 실패<br>";
	});
});