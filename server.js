var http = require("http"),
	url = require("url");
function start(route, handle) {;
http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;
	console.log("Request for" + pathname);
	route(pathname, handle, res);
}).listen(3000);
}

exports.start = start;