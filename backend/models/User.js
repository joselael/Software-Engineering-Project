const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, trim: true},
    first_name: {type: String, trim: true, required: true},
    last_name: {
        value: {type: String, trim: true, required: true},
        visible: {type: Boolean, trim: true, default: true, required: false}
    },
    email: {
        value: {type: String, unique: true, trim: true},
        visible: {type: Boolean, trim: true, default: true, required: false}
    },
    req_money: {type: Number, default: 0},
    password: {type: String, required: true},
    user_type: {type: String, required: true},
    account_balance: {type: Number, default: 0},
    money_made: {type: Number, default: 0},
    project_count: {type: Number, default: 0},
    enabled: Boolean,
    protest_message: String,
    bad_rater: {type: Boolean,default:false},
    protest_check: {type: Boolean, default: false},
    warnings: {type: Number, default: 0},
    blacklisted: Boolean,
    admin_message: String,
    number_projects: {type: Number, default: 0},
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
