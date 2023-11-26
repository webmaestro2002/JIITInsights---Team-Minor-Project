// const mongoose = require('mongoose');
// const{Schema} = mongoose;

// const UserSchema = new Schema({
//     name: String,
//     email: {type:String, unique:true},
//     password: String,
// });

// const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;


// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, enum: ['admin', 'user'], default: 'user' } // Added role field
// });

// const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;


// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Added role field
//     userName: { type: String, unique: true, sparse: true, required: function () { return this.role === 'admin'; } }, // Updated username field
//     adminPassword: { type: String, required: function () { return this.role === 'admin'; } } // Updated adminPassword field
// });

// const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, enum: ['admin', 'user'], default: 'user' },
//     userName: { type: String, unique: true, sparse: true, required: function () { return this.role === 'admin'; } },
//     adminEmail: { type: String, unique: true, sparse: true, required: function () { return this.role === 'admin'; } }, // Added adminEmail field
//     adminPassword: { type: String, required: function () { return this.role === 'admin'; } }
// });

// const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    userName: { type: String, unique: true, sparse: true, required: function () { return this.role === 'admin'; } },
    adminPassword: { type: String, required: function () { return this.role === 'admin'; } }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
