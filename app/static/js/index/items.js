Lollipop.Widget('items', function() {
	this.container(document.getElementById('main-wrap'));
	var items = this.Element(),
		self = this;
	items.Collection.partial(document.getElementById('items-partial').innerHTML);

	this.ajax.post(null, '/catalog', this, 
		function(data) {
			data = JSON.parse(data);
			var len = data.length;
			while(len--) {
				var sizes = data[len].sizes.split(','),
					str;
				str = '<ul>';
				sizes.forEach(function(size) {
					size.trim();
					str += '<li>'+size+'</li>';
				});
				str += '</ul>';
				data[len].sizes = str;
			}
			items.Collection.add(data);
			items.View.setTemplate(document.getElementById('items-tpl').innerHTML).render();
		}, function() {
			//error
	});
	
	this.on(document.getElementById('main-wrap'), 'click', function(e) {
		var e = e || window.event,
			target = e.target || e.srcElement,
			id = target.getAttribute('data-id');

		if(id) {
			window.location.hash = '#/item/' + id;
		} else {
			target = target.parentNode;
			id = target.getAttribute('data-id');
			window.location.hash = '#/item/' + id
		}

		return false;
	});

	this.subscribe('get_item_start', function(id) {
		self.publish('get_item_stop', items.Collection.find('id', +id));
	})
});