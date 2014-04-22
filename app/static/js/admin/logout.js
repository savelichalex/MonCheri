Lollipop.Widget('logout', function() {
	var self = this;

	this.on(this.$('logout'), 'click', function(e) {
		e = e || window.event;

		e = e.preventDefault();

		self.ajax.post(null, 'admin/logout', this, function(data) {
			data = JSON.parse(data);
			if(data.message === 'ok') {
				window.location.reload();
			}
		}, function() {

		});
	});
});