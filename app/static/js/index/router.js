Lollipop.Router(function() {
	var self = this;

	this.route('', function() {
		self.publish('route:root');
	});

	this.route('item/:id', function(id) {
		self.publish('route:item', id);
	});
});