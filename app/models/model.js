var Lollipop = require('lollipop'),
	fs = require('fs');

Lollipop.Model('model', function() {
	var self = this;
	//connection to db
	this.newMongoConnection('localhost').db('moncheri').collection('products');

	this.setMethod('index')
		.mongoConnect()
		.find({})
		.then(function(items) {
			var defer = self.Deferred();
			items.toArray(function(err, data) {
				if(err) {
					defer.reject(err);
				} else {
					defer.resolve({result: data});
				}
			});
			return defer.promise;
		})
		.end();

	this.setMethod('details')
		.mongoConnect()
		.findOne(function(id) {
			return { id: +id };
		})
		.end();

	this.setMethod('update')
		.mongoConnect()
		.update(function(data) {
			return [
			{
				id: +data.id
			},
			{
				$set:
				{
					title: data.title,
					sizes: data.sizes,
					price: data.price,
					description: data.description
				}
			}
			];
		})
		.end();

	var image;

	this.setMethod('update_photo')
		.then(function(data) {
			image = data;
		})
		.mongoConnect()
		.findOne(function() {
			return {
				id: +image.id
			};
		})
		.then(function(data) {
			if(!data.thumb) return false;
			fs.unlink('app/static/images/'+data.thumb, function(err) {
				if(err) console.log(err);
			});
		})
		.update(function() {
			return [
			{
				id: +image.id
			},
			{
				$set:
				{
					thumb: image.thumb
				}
			}
			];
		})
		.end();

	var item, item_id;

	this.setMethod('new_item')
		.then(function(data) {
			item = data;
		})
		.mongoConnect()
		.find({})
		.then(function(items) {
			var defer = self.Deferred();
			items
				.sort({ id: -1 })
				.limit(1)
				.toArray(function(err, data) {
					if(err) {
						defer.reject(err);
					} else {
						defer.resolve(data[0].id + 1);
					}
				});
			return defer.promise;
		})
		.insert(function(id) {
			item_id = id;
			return {
				id: +id,
				title: item.title,
				sizes: item.sizes,
				price: item.price,
				description: item.description,
				thumb: null
			};
		})
		.then(function() {
			return item_id;
		})
		.end();

	var del_id;

	this.setMethod('delete_item')
		.mongoConnect()
		.findOne(function(id) {
			del_id = id;
			return {
				id: +id
			};
		})
		.then(function(data) {
			if(!data.thumb) return false;
			fs.unlink('app/static/images/'+data.thumb, function(err) {
				if(err) console.log(err);
			});
		})
		.remove(function() {
			return {
				id: +del_id
			};
		})
		.end();
});