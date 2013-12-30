var fs = require("fs");

function home (res) {
	console.log("this is start page");
	fs.readFile("index.html", function(err, data){
		if (err) {
			res.end("404 Not found:(");
		}
		res.writeHead(200, {"Content-type": "text/html"});
		res.end(data);
	});
}

function catalog (res) {
	console.log("this is catalog page");
	fs.readFile("test.json", function(err, data){
		if (err) {
			res.end("404 Not found:(");
		}
		res.writeHead(200, {"Content-type": "application/json"});
		res.end(data);
	});
}

function contakts (res) {
	console.log("this is contakts page");
}

function stylesAndNotFound (res, pathname) {
	var tmp = pathname.lastIndexOf("."),
			extension = pathname.substring((tmp+1)),
			mimes = {
				"css": "text/css",
				"js": "text/javascript",
				"html": "text/html",
				"png": "image/png",
				"jpg": "image/jpeg",
				"jpeg": "image/jpeg",
				"eot": "application/vnd.ms-fontobject",
				"ttf": "application/octet-stream",
				"woff": "application/octet-stream",
				"svg": "image/svg+xml"
			},
			file_path;

		for (var key in mimes) {
			if (extension === key) {
				file_path = "." + pathname;
			}
		}

		if (file_path) {
			fs.readFile(file_path, function(err, data){
				if (err) {
					res.writeHead(500, {"Content-type": "text/plain"});
					res.end("500: Internal Server Error");
				}
				res.writeHead(200, {"Content-type": mimes[extension]});
				res.end(data);
			});
		} else {
			console.log("No handler for" + pathname);
			res.writeHead(404, {"Content-type": "text/plain"});
			res.write("404 Not found:(");
			res.end();
		}
}

exports.home = home;
exports.catalog = catalog;
exports.contakts = contakts;
exports.stylesAndNotFound = stylesAndNotFound;