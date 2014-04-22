Lollipop.Widget('items', function() {
	this.container(this.$('main-wrap'));
	var items = this.Element(),
		self = this;
	items.Collection.partial(this.$('items-partial').innerHTML);

	window.location.hash = '#/change';

	this.subscribe('route:change', function() {
		self.ajax.post(null, '/catalog', this, 
			function(data) {
				items.Collection.set(JSON.parse(data));
				items.View.setTemplate(document.getElementById('items-tpl').innerHTML).render();
			}, function() {
				//error
		});
	});	
	
	this.on(this.$('main-wrap'), 'click', function(e) {
		var e = e || window.event,
			target = e.target || e.srcElement,
			parent = target.parentNode,
			id = parent.getAttribute('data-id');

		if(id && parent.className === "item-line") {
			window.location.hash = '#/change/item/' + id;
		}
		if(target.className === "item-edit-image-hover") {
			self.$('edit-image-'+active.id.slice(10)).click();
		}
		if(target.className === "delete") {
			e.preventDefault();

			id = parent.parentNode.getAttribute('data-id');
			self.ajax.post(null, '/admin/item/'+id+'/delete', this,
				function(data) {
					data = JSON.parse(data);
					if(data && data.message === 'ok') {
						items.Collection.removeBy('id', +id);
						items.View.setTemplate(document.getElementById('items-tpl').innerHTML).render();
					}
				}, function() {
					//error
				});
		}

		return false;
	});

	this.on(this.$('main-wrap'), 'change', function(e) {
		var e = e || window.event,
			target = e.target || e.srcElement,
			id = active.id.slice(10);

		if(target.id !== 'edit-image-'+id) {
			return false;
		}
		var image = self.$('edit-image-'+ id).files[0];

		self.ajax.post(image, '/admin/item/' + id + '/new_image', this, function(data) {
			var image_container = self.$('item-edit-image-' + id),
				data = JSON.parse(data);
			image_container.style.backgroundImage = "url('app/static/images/"+data.thumb+"')";
		}, function() {
			//
		});

		return false;
	});

	this.on(this.$('main-wrap'), 'submit', function(e) {
		var e = e || window.event,
			target = e.target || e.srcElement,
			id = active && active.id.slice(10);

		e.preventDefault();

		if(target.parentNode.id !== 'item-edit-'+id) {
			return false;
		}

		self.ajax.post(new FormData(target), '/admin/item/'+id+'/update', this, function(data) {
			//
		}, function() {
			//
		});
	});

	var active;

	this.subscribe('route:change_item', function(id) {
		if(active) {
			active.style.height = "0";
		}
		active = self.$('item-edit-'+id);
		active.style.height = "400px";
		items.Model.set(items.Collection.find('id', +id));
	});
});