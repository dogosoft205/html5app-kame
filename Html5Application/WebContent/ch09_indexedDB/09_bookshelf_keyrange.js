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
		title : "CSS35",
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