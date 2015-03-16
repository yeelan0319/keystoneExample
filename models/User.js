var keystone = require('keystone'),
    Types = keystone.Field.Types;

var userConf = {
    'guest': {
        canAccessDevice: false,
        canAccessSymbolic: false,
        canAccessKeystone: false
    },
    'customer': {
        canAccessDevice: true,
        canAccessSymbolic: false,
        canAccessKeystone: false
    },
    'employee': {
        canAccessDevice: false,
        canAccessSymbolic: true,
        canAccessKeystone: false
    },
    'editor': {
        canAccessDevice: false,
        canAccessSymbolic: true,
        canAccessKeystone: true
    },
    'admin': {
        canAccessDevice: false,
        canAccessSymbolic: true,
        canAccessKeystone: true
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
    password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
    type: {type: Types.Select, initial: true, label: 'User Type', index: false, options: 'guest, customer, employee, editor, admin', default: 'guest'},
    canAccessDevice: { type: Boolean, index: false, initial: false, hidden: true },
    canAccessSymbolic: { type: Boolean, index: false, initial: false, hidden: true },
    canAccessKeystone: { type: Boolean, index: false, initial: false, hidden: true },
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
    this.canAccessKeystone = userConf[type].canAccessKeystone;
    this.canAccessDevice = userConf[type].canAccessDevice;
    this.canAccessSymbolic = userConf[type].canAccessSymbolic;
    console.log(this);
    console.log(userConf);
    next();
})
User.register();
