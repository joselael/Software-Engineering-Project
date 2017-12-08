const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, trim: true},
    first_name: {type: String, trim: true, required: true},
    last_name: {type: String, trim: true, required: true},
    email: {
        value: {type: String, unique: true, trim: true, required: true},
        visible: {type: Boolean, trim: true, default: true, required: false}
    },
    password: {type: String, required: true},
    user_type: {type: String, required: true},
    account_balance: {type: Number, default: 0},
    enabled: Boolean,
    warnings: {type: Number, default: 0},
    blacklisted: Boolean,
    admin_message: String,
    linkedIn: {
        value: {type: String, trim: true, required: false},
        visible: {type: Boolean, trim: true, default: true, required: false}
    },
    github: {
        value: {type: String, trim: true, required: false},
        visible: {type: Boolean, trim: true, default: true, required: false}
    },
    first_login: Boolean,
    delete_requested: {type: Boolean, default: false},
    average_rating: {type: Number, default: 0, required: false}
});

const User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
