var http = require("http"),
	url = require("url"),
	PORT = +process.env.PORT || 1337;

function start(route, handle) {;
http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;
	console.log("Request for" + pathname);
	route(pathname, handle, res);
}).listen(PORT);
}

exports.start = start;