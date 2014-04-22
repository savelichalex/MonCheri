Lollipop.Widget('description', function() {
	var modal = document.getElementById('item-modal'),
		overlay = document.getElementById('item-modal-overlay');
	this.container(modal);

	var description = this.Element(),
		self = this;

	this.subscribe('route:item', function(id) {
		self.publish('get_item_start', id);
	});
	this.subscribe('get_item_stop', function(data) {
		description.Model.set((data || {}));
		description.View.setTemplate(document.getElementById('items-description').innerHTML).render();
		modal.style.display = "block";
		overlay.style.display = "block";
	});

	this.on(overlay, 'click', function() {
		window.location.hash = "#/";
	});

	this.subscribe('route:root', function() {
		modal.style.display = "none";
		overlay.style.display = "none";
	});
});