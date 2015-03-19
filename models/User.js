var keystone = require('keystone'),
    _ = require('underscore'),
    Types = keystone.Field.Types;

var userConf = {
    'guest': {
        //no previlege
    },
    'customer': {
        canAccessDevice: true
    },
    'employee': {
        canAccessSymbolic: true
    },
    'editor': {
        canAccessSymbolic: true,
        canAccessKeystone: true
    },
    'admin': {
        canAccessSymbolic: true,
        canAccessKeystone: true,
        canPublish: true
    },
}
/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    password: { type: Types.Password, initial: true, required: true },
    locale: {type: String, initial: false, hidden: true, default: 'en', index: false}
}, 'Permissions', {
    type: {type: Types.Select, initial: true, label: 'User Type', index: false, options: 'guest, customer, employee, editor, admin', default: 'guest'},
    canAccessDevice: { type: Boolean, index: false, initial: false, hidden: true, default: false },
    canAccessSymbolic: { type: Boolean, index: false, initial: false, hidden: true, default: false },
    canAccessKeystone: { type: Boolean, index: false, initial: false, hidden: true, default: false },
    canPublish:{ type: Boolean, index: false, initial: false, hidden: true, default: false }
});

// Provide access to Keystone
//User.schema.virtual('canAccessKeystone').get(function() {
//	return this.isAdmin;
//});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

User.defaultColumns = 'name, email';
User.schema.pre('save', function(next){
    var type = this.type;
    _.extend(this, userConf[type]);
    next();
})
User.register();
