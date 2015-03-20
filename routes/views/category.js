var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = req.params.category;
	locals.filters = {
		category: locals.section
	};
	locals.data = {
		posts: []
	};
	// Load the current category filter
	view.on('init', function(next) {
		
		if (locals.filters.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
        });
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');
		if (locals.data.category) {
			q.where('category').in([locals.data.category]);
		}
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	// Render the view
	view.render(function(err, req, res){
            if(err){
                throw new Error("There is something wrong before render is called");
            }
            if(locals.data.category.template){
                res.render(locals.data.category.template, locals);
            }
            else{
                res.render('category-tmp1', locals);
            }
        });
	
};
