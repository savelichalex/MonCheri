function route (pathname, handle, res) {
	console.log("route call for" + pathname);
	if(typeof handle[pathname] === "function") {
		handle[pathname](res);
	} else {
		handle["stylesAndNotFound"](res, pathname);
	}
}

exports.route = route;