var Lollipop = require('lollipop');

Lollipop.Router(function() {
	this.route("/", "main#index");
	this.route("catalog", "main#catalog");
	this.route("catalog/:id", "main#details");
	this.route("contacts", "main#contacts");
	this.route("admin", "admin#index");
	this.route("admin/login", "admin#login");
	this.route("admin/logout", "admin#logout");
	this.route("admin/item/:id/new_image", "admin#new_image");
	this.route("admin/item/:id/update", "admin#update");
	this.route("admin/item/:id/delete", "admin#delete_item");
	this.route("admin/item/create", "admin#new_item");

	this.startServer();
});