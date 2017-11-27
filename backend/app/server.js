const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// var User = require('./models/User')
const mongoose = require('mongoose');  
var cors = require('cors');

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
var User = mongoose.model('User', UserSchema);

var config = require('./config');
// var UserController = require('./models/UserController');

const bcryptSaltRounds = 10
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(errorhandler());
app.use(cors());

/* debug */
// const ddb = {}; //debug database
// ddb.accounts = {};

// register endpoint
app.post('/register'/*, [
    check('username').isAlphanumeric().withMessage("invalid username").trim(),
    check('first_name').isAlpha().withMessage("invalid first name").trim,
    check('last_name').isAlpha().withMessage("invalid last name").trim(),
    check('password', 'passwords must be at least 8 chars long and contain one number')
    .isLength({min : 5}).matches(/\d/)
]*/, function(req, res) {
    //outputting for debugging purposes
    console.log("creating user");
    console.log(`req.body.username: ${req.body.username}`);
    console.log(`req.body.first_name: ${req.body.first_name}`);
    console.log(`req.body.last_name: ${req.body.last_name}`);
    console.log(`req.body.email: ${req.body.email}`);
    console.log(`req.body.password: ${req.body.password}`);
    console.log(`req.body.user_type: ${req.body.user_type}`);
    console.log(mongoose.connection.readyState);
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
      console.log("done creating user");
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 43200 // expires in 12 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });/* (req, res, next) => {

    let acc_id = Object.keys(ddb.accounts).length; 
    let user_obj = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        // save hash of password, actual plaintext is never saved in database 
        password: bcrypt.hashSync(req.body.password, bcryptSaltRounds),
        id: acc_id,
        user_type: null,
        enabled: false // accounts is disabled until admin enables it ,
        admin_message: null
    }

    ddb.accounts[req.body.username] = user_obj; // save user into db 
    res.status(201).send({id:acc_id});
}) */

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

  app.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });/*{
    if(!(req.body.username in ddb.accounts)) return res.status(401).send({
        msg: "Not Authorized."
    });

    // Compare hash of login password, with has of registered password 
    if (bcrypt.compareSync(req.body.password, ddb.accounts[req.body.username].password, function(error, res){
        console.log("in compareSync");
        if (error) return res.status(400).send({
            msg: "Invalid request."
        });   
    }))
     res.status(201).send({
        username: ddb.accounts[req.body.username].username,
        first_name: ddb.accounts[req.body.username].first_name,
        last_name: ddb.accounts[req.body.username].last_name,
        id: ddb.accounts[req.body.username].id
    });
else return res.status(401).send({
    msg: "Not Authorized."
});

} )*/

/* get user accounts, this should presumably only be callable by admin */
// app.get('/accounts', (req, res) => {
//     res.status(200).send(ddb.accounts);
// })


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

/* update account info, also should only be callable by admin */
// app.put('/accounts/:id', (req, res)=>{
//     store.accounts[req.params.id] = req.body;
//     res.status(200).send(store.accounts[req.params.id]);
// })

/* delete account, only callable by admin */
// app.delete('/accounts/:id', (req, res) => {
//     ddb.accounts.splice(req.params.id, 1);
//     res.status(204).send();
// })

// if endpoint doesn't exist
app.all('/*', (req, res) => {
    res.status(404).send("Not found");
})

app.listen(PORT);
