const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    user_type: String,
    account_balance: Number,
    enabled: Boolean,
    warnings: Number,
    blacklisted: Boolean,
    admin_message: String,
    linkedIn: String,
    github: String,
    first_login: Boolean
});

const User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
