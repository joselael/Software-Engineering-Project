const mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({  
  username: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  user_type: String,
  enabled: Boolean,
  blacklisted: Boolean,
  admin_message: String
});

var User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
