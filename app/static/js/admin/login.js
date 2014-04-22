Lollipop.Widget('login', function() {
	var self = this;

	this.on(this.$('admin_login'), 'submit', function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;

		e.preventDefault();

		self.ajax.post(new FormData(target), 'admin/login', this, function(data) {
			data = JSON.parse(data);
			if(data.message === 'ok') {
				window.location.reload();
			}
		}, function(data) {

		});
	});
});