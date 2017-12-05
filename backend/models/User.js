const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    user_type: String,
    warnings: Number,
    enabled: Boolean,
    blacklisted: Boolean,
    admin_message: String
});

const User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
