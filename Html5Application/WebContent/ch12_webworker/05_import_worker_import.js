/**
 * 
 */
importScripts("05_import_worker_common.js");

var db = indexedDB;
addEventListener("message", function(e) {
	if (e.data == "close") {
		closeWorker();
	} else {
		heavyTask();
	}
});

function heavyTask() {
	postMessage("indexed DB를 이용한 작업 중." + db.toString());
	for(var i=0; i<12345678901; i++){
		// do long task
	}
	postMessage("indexed DB를 이용한 작업 종료");
}