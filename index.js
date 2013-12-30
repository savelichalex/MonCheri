var server = require("./server"),
	router = require("./router"),
	requestHandlers = require("./requestHandlers")

var handle = {};
handle["/"] = requestHandlers.home;
handle["/catalog"] = requestHandlers.catalog;
handle["/contakts"] = requestHandlers.contakts;
handle["stylesAndNotFound"] = requestHandlers.stylesAndNotFound;

server.start(router.route, handle);