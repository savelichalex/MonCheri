Lollipop.Widget('new_item', function() {
	this.container(this.$('main-wrap'));
	var self = this;
	var item = this.Element({
		title: null,
		sizes: null,
		price: null,
		description: null,
		photo: null,
		button: null
	});

	this.subscribe('route:create_item', function() {
		item.View.setTemplate(self.$('item-new').innerHTML).render();
	});

	this.on(this.$('main-wrap'), 'submit', function() {
		var e = e || window.event,
			target = e.target || e.srcElement;

		e.preventDefault();

		if(target.parentNode.id !== 'item-new') {
			return false;
		}

		self.ajax.post(new FormData(target), '/admin/item/create', this, function(data) {
			var image = self.$('item-new-image').files[0];
			if(data.message === 'error') {
				throw data.error
			} else {
				data = JSON.parse(data);
				if(image) {
					self.ajax.post(image, '/admin/item/'+data.id+'/new_image', this, function(data) {
						var image_container = self.$('item-edit-image'),
							data = JSON.parse(data);
						image_container.style.backgroundImage = "url('app/static/images/"+data.thumb+"')";
					}, function() {

					});
				}
			}
		}, function() {
			//
		});
	});

	this.on(this.$('main-wrap'), 'click', function(e) {
		var e = e || window.event,
			target = e.target || e.srcElement;

		if(target.id === "item-new-image-hover") {
			self.$('item-new-image').click();
		}

		return false;
	});
});