const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, trim: true},
    first_name: {type: String, trim: true, required: true},
    last_name: {type: String, trim: true, required: true},
    email: {
        value: {type: String, unique: true, trim: true, required: true},
        visible: {type: Boolean, trim: true, default: true, require: false}
    },
    password: {type: String, required: true},
    user_type: {type: String, required: true},
    account_balance: Number,
    enabled: Boolean,
    warnings: Number,
    blacklisted: Boolean,
    admin_message: String,
    linkedIn: {
        value: {String, trim: true, required: false},
        visible: {type: Boolean, trim: true, default: true, require: false}
    },
    github: {
        value: {type: String, trim: true, require: false},
        visible: {type: Boolean, trim: true, default: true, require: false}
    },
    first_login: Boolean,
    delete_requested: {type: Boolean, default: false}
});

const User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
