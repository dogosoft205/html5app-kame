/**
 * 
 */
addEventListener("message", function(e){
	console.log("worker에서 message 수신"+this);
	for(var i=0; i<e.data; i++){
		// do something
	}
	postMessage(i);
});