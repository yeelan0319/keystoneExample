var keystone = require('keystone'),
    _ = require('underscore'),
    Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

PostCategory.add({
	name: { type: String, required: true },
        subtitle: { type: String },
        image: { type: Types.Url },
        template: {type: Types.Select, default: "category-tmp1", options: 'category-tmp1'}
});

PostCategory.relationship({ ref: 'Post', path: 'categories' });

PostCategory.register();
