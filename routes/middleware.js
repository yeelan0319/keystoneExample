/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
            { label: 'Industries & Solutions', key: 'solutions', href: '/solutions' },
            { label: 'Products', key:'products', href: '/products' }
	];
	
	locals.user = req.user;
	
	next();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};

exports.setLocale = function(req, res, next){
    var locale;
    if(req.user){
        locale = req.user.locale;
    }
    else if(req.signedCookies['locale']){
        locale = req.signedCookies['locale'];
    }
    else if(req.acceptsLanguages()){
        locale = req.acceptsLanguages();
    }
    else{
        locale = 'en';
    }
    // set the cookie information to perserve locale information
    if(req.signedCookies['locale'] !== locale){
        res.cookie('locale', locale, { signed: true, httpOnly: true });
    }
    // attach locale information to req for i18n-node module to use
    req.setLocale(locale);
    next();
};
