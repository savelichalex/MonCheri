var Lollipop = require('lollipop');
var fs = require('fs'); //temp!!!

Lollipop.Controller('admin', function() {
	var self = this,
		admin;

	this.setAction('index')
		.then(function(req) {
			console.log(admin, req.headers.cookie.match(/_id=([a-zA-Z0-9]+)/)[1]);
			if(admin && admin.cookieId === req.headers.cookie.match(/_id=([a-zA-Z0-9]+)/)[1]) {
				this.render('admin');
			} else {
				this.render('admin_login');
			}
		});

	this.setAction('login')
		.then(function(req) {
			var postData = '',
				form = {},
				that = this;
			form.cookie = req.headers.cookie.match(/_id=([a-zA-Z0-9]+)/)[1];
			req.addListener('data', function(data) {
				var postData = data.toString('utf-8');
				var match;
				postData = postData.split("\r\n");
				var len = postData.length;
				for(var i = 1; i < len; i += 4) {
					if(postData[i]) {
						match = postData[i].match(/name=\"([a-zA-Z0-9]+)\"/);
						form[match[1]] = postData[i+2];
					}
				}
			});
			req.addListener('end', function() {
				if(form.login === "admin" && form.password === "112211") {
					admin = {};
					admin.cookieId = form.cookie;
					admin.login = "admin";
					admin.password = "112211";
					that.json({message: 'ok'});
				} else {
					that.json({message: 'error'});
				}
			});
		});

	this.setAction('logout')
		.then(function() {
			admin = void 0;
			this.json({message: 'ok'});
		});

	this.setAction('catalog')
		.callMethod('model', 'index')
		.then(function(items) {
			this.json(items.result);
		});

	this.setAction('new_image')
		.then(function(id, req) {
			var fileName = new Date().getTime() + '.' + req.headers['content-type'].split('/')[1];
			var file = fs.createWriteStream('app/static/images/'+fileName);
			req.pipe(file);
			this.json({
				thumb: fileName
			});
			return { id: id, thumb: fileName };
		})
		.callMethod('model', 'update_photo');

	this.setAction('update')
		.then(function(id, req) {
			var postData = '',
				form = {},
				defer = self.Deferred();
			form.id = id;
			req.addListener('data', function(data) {
				var postData = data.toString('utf-8');
				var match;
				postData = postData.split("\r\n");
				var len = postData.length;
				for(var i = 1; i < len; i += 4) {
					if(postData[i]) {
						match = postData[i].match(/name=\"([a-zA-Z0-9]+)\"/);
						form[match[1]] = postData[i+2];
					}
				}
			});
			req.addListener('end', function() {
				defer.resolve(form);
			});
			return defer.promise;
		})
		.callMethod('model', 'update')
		.then(function() {
			this.json({message: 'ok'});
		}, function() {
			this.json({message: 'error'});
		});

	this.setAction('new_item')
		.then(function(req) {
			var postData = '',
				form = {},
				defer = self.Deferred();
			req.addListener('data', function(data) {
				var postData = data.toString('utf-8');
				var match;
				postData = postData.split("\r\n");
				var len = postData.length;
				for(var i = 1; i < len; i += 4) {
					if(postData[i]) {
						match = postData[i].match(/name=\"([a-zA-Z0-9]+)\"/);
						form[match[1]] = postData[i+2];
					}
				}
			});
			req.addListener('end', function() {
				defer.resolve(form);
			});
			return defer.promise;
		})
		.callMethod('model', 'new_item')
		.then(function(id) {
			this.json({message: 'ok', id: id});
		}, function(err) {
			this.json({message: 'error', error: err});
		});

	this.setAction('delete_item')
		.callMethod('model', 'delete_item')
		.then(function() {
			this.json({message: 'ok'});
		}, function() {
			this.json({message: 'error'});
		});
});