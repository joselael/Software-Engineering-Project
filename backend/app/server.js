const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');  
const cors = require('cors');

mongoose.connect('mongodb://nodejsapp:dllmz322squad@ds119436.mlab.com:19436/swepdb');
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
var ProjectSchema = new mongoose.Schema({
  author_username: String,
  summary: String,
  post_date: { type: Date, default: Date.now },
  bid_start: { type: Date, default: Date.now },
  bid_end: Date,
  min_budget: Number,
  max_budget: Number,
  assignee: String,
  completed: Boolean,
  problematic: Boolean,
  admin_comments: String
});

var User = mongoose.model('User', UserSchema);
var Project = mongoose.model('Project', ProjectSchema);

var config = require('./config');

const bcryptSaltRounds = 10
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(errorhandler());
app.use(cors());

// register endpoint
app.post('/register'/*, [
    check('username').isAlphanumeric().withMessage("invalid username").trim(),
    check('first_name').isAlpha().withMessage("invalid first name").trim,
    check('last_name').isAlpha().withMessage("invalid last name").trim(),
    check('password', 'passwords must be at least 8 chars long and contain one number')
    .isLength({min : 5}).matches(/\d/)
]*/, function(req, res) {
    User.create({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcryptSaltRounds),
      user_type: req.body.user_type,
      enabled: false,
      blacklisted: false,
      admin_message: null
    }, function (err, user) {
      // console.log("done creating user");
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 43200 // expires in 12 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });


app.post('/createproject', function(req, res) {
  User.create({
    author_username: req.body.author,
    summary: req.body.summary,
    bid_end: Date(req.body.bid_end),
    min_budget: parseInt(req.body.min_budget),
    max_budget: parseInt(req.body.max_budget),
    assignee: null,
    completed: false,
    problematic: false,
    admin_comments: null
  }, function (err, user) {
    // console.log("done creating user");
    if (err) return res.status(500).send("There was a problem creating the project.")
    // create a token
    res.status(200).send({ created: true, id: project_id });
  }); 
});


app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 43200 // expires in 12 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  });


  // get all users from the database
  app.get('/accounts', function (req, res) {
    User.find({},{password: 0}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});


  // get all projects from the database
  app.get('/projects', function (req, res) {
    Project.find({}, function (err, projects) {
        if (err) return res.status(500).send("There was a problem finding the projects.");
        res.status(200).send(projects);
    });
});


// delete a user from the database
app.delete('/delete/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
      res.status(200).send("User: "+ user.name +" was deleted.");
  });
});


// update user profile in database
app.put('/update/:id', function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
      if (err) return res.status(500).send("There was a problem updating the user.");
      res.status(200).send(user);
  });
});


  app.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });


//get user by token
app.get('/user', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      User.findById(decoded.id, {password: 0}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
      });
    });
  });


// if endpoint doesn't exist
app.all('/*', (req, res) => {
    res.status(404).send("Not found");
})


app.listen(PORT);
