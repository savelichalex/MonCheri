var Lollipop = require('lollipop');

Lollipop.Controller('main', function() {
	this.setAction('index')
		.then(function() {
			this.render();
		});

	this.setAction('contacts')
		.then(function() {
			this.render();
		});

	this.setAction('catalog')
		.callMethod('model', 'index')
		.then(function(items) {
			this.json(items.result);
		});

	this.setAction('details')
		.callMethod('model', 'details')
		.then(function(obj) {
			this.json(obj);
		});
});