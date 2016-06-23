var ports = new Array();
var prev="";
addEventListener("connect", function(e){
	var clientPort = e.ports[0];
	ports.push(clientPort);
	
	clientPort.addEventListener("message", function(e){
		prev+=e.data;
		for(var i=0; i<ports.length; i++){
			ports[i].postMessage(e.data)
		}
	});
	clientPort.start();
	clientPort.postMessage(prev);
});