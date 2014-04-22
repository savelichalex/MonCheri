Lollipop.Router(function() {
	var self = this;

	this.route('', function() {
		self.publish('route:root');
	});

	this.route('change', function() {
		self.publish('route:change');
	});

	this.route('change/item/:id', function(id) {
		self.publish('route:change_item', id);
	});

	this.route('create', function() {
		self.publish('route:create_item');
	});
});