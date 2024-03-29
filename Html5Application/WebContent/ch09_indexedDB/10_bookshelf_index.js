var dashboard = document.getElementById("dashboard");
var bookShelfDB;
function openDB() {
	indexedDB.deleteDatabase("bookShelf");
	var openResult = window.indexedDB.open("bookShelf", 1);
	openResult.addEventListener("success", function() {
		bookShelfDB = this.result;
		initData();
	});
	openResult.addEventListener("upgradeneeded", function() {
		bookShelfDB = this.result;
		if (bookShelfDB.objectStoreNames.contains("books")) {
			bookShelfDB.deleteObjectStore("books");
		}
		var objStore = bookShelfDB.createObjectStore("books", {
			keyPath : "isbn",
			autoIncrement : true
		});

		objStore.createIndex("yearIdx", "year", {
			unique : false
		});
		objStore.createIndex("titleIdx", "title", {
			unique : false
		});
	});
}
openDB();

function initData() {
	var tx = bookShelfDB.transaction([ "books" ], "readwrite");

	var objStore = tx.objectStore("books");
	objStore.put({
		title : "HTML5",
		year : 2016,
		category : "기술"
	});
	objStore.put({
		title : "CSS3",
		year : 2015,
		category : "기술"
	});
	objStore.put({
		title : "JavaScript",
		year : 2014,
		category : "기술"
	});
	objStore.put({
		title : "Java",
		year : 2013,
		category : "기술"
	});
	objStore.put({
		title : "Servlet/JSP",
		year : 2012,
		category : "기술"
	});
	objStore.put({
		title : "JQuery",
		year : 2011,
		category : "기술"
	});
	objStore.put({
		title : "SQL",
		year : 2010,
		category : "기술"
	});
	objStore.put({
		title : "Spring",
		year : 2009,
		category : "기술"
	});
	objStore.put({
		title : "MyBatis",
		year : 2008,
		category : "기술"
	});
	objStore.put({
		title : "XML",
		year : 2007,
		category : "기술"
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
});

var lowerIsbn = document.getElementById("lowerISBN");
var upperIsbn = document.getElementById("upperISBN");

document.getElementById("getByIsbnRangeB").addEventListener(
		"click",
		function() {
			var keyRange;
			var lowerValue = Number.parseInt(lowerIsbn.value);
			var upperValue = Number.parseInt(upperIsbn.value);

			if (!(lowerValue || upperValue)) {
				dashboard.innerHTML = "최소값과 최대값이 필요합니다.";
				return;
			} else {
				keyRange = IDBKeyRange.bound(lowerValue, upperValue, false,
						false);
			}
			var tx = bookShelfDB.transaction([ "books" ], "readonly");

			var objStore = tx.objectStore("books");
			var request = objStore.getAll(keyRange);
			request.addEventListener("success", function() {
				dashboard.innerHTML = "";
				for (var i = 0; i < request.result.length; i++) {
					dashboard.innerHTML += JSON.stringify(request.result[i])
							+ "<br>";
				}
			});
		});

function showIndexInfo(idx) {
	console.log("인덱스 정보");
	console.log("이름: " + idx.name, "소속 오브젝트스토어: " + idx.objectStore);
	console.log("키패스: " + idx.keyPath, "유일성: " + idx.unique);
}
var startChar = document.getElementById("startChar");
var endChar = document.getElementById("endChar");

document.getElementById("titleIdxB").addEventListener("click", function() {
	var keyRange;
	var startValue = startChar.value;
	var endValue = endChar.value;

	if (!(startValue || endValue)) {
		dashboard.innerHTML = "시작 문자와 끝 문자가 필요합니다.";
		return;
	} else {
		keyRange = IDBKeyRange.bound(startValue, endValue, false, false);
	}
	var tx = bookShelfDB.transaction([ "books" ], "readonly");

	var objStore = tx.objectStore("books");
	var titleIdx = objStore.index("titleIdx");
	showIndexInfo(titleIdx);
	var request = titleIdx.getAll(keyRange);
	request.addEventListener("success", function() {
		dashboard.innerHTML = "";
		for (var i = 0; i < request.result.length; i++) {
			dashboard.innerHTML += JSON.stringify(request.result[i]) + "<br>";
		}
	});
});