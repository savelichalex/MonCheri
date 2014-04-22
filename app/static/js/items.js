Lollipop.Widget('items', function() {
	this.container(document.getElementById('main-wrap'));
	var items = this.Element();
	items.Collection.partial(document.getElementById('items-partial').innerHTML);

	this.ajax.post(null, '/catalog', this, 
		function(data) {
			items.Collection.add(JSON.parse(data));
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
});