// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
    handlebars = require('express-handlebars'),
    i18n = require('i18n'); 

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'symbolic',
	'brand': 'Symbolic',
	
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,
	
	'auto update': true,
        
    'mongo': process.env.MONGO_PORT,
	'session': true,
        'session store': 'connect-redis',
        'session store options': {
            "host": process.env.DB_PORT_6379_TCP_ADDR,
            "port": process.env.DB_PORT_6379_TCP_PORT,
            "ttl": 60 * 60 * 24 * 30,
        },
	'auth': true,
	'user model': 'User',
	'cookie secret': '~V}]S+..qU[k(dZy&U&5|*7[3BxTAec4V3`|3r;W9;9C6<:^.WkSr<:}92~=VpEf',
        'signin redirect': function(user, req, res){
            res.cookie('locale', user.locale, { signed: true, httpOnly: true });
            res.redirect('/');
        },
        
        'ssl': true,
        'ssl key': 'server.key',
        'ssl cert': 'server.crt',
        
        
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

//configure i18n
i18n.configure({
    locales:['en', 'zh-CN'],
    directory: __dirname + '/locales',
    defaultLocale: 'en'
});

// Load your project's Routes

keystone.set('routes', require('./routes'));
// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();