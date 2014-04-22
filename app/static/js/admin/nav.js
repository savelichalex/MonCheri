Lollipop.Widget('nav', function() {
	var buttons = this.$('nav-main').getElementsByTagName('li'),
		change = buttons[0],
		create = buttons[1],
		active;

	this.subscribe('route:change', function() {
		change.className = 'nav-active';
		if(active) {
			active.className = 'nav-notactive';
		}
		active = change;
	});

	this.subscribe('route:create_item', function() {
		create.className = 'nav-active';
		if(active) {
			active.className = 'nav-notactive';
		}
		active = create;
	});
});