var express = require('express');
var router = express.Router();
var cors = require('cors');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var db = require('../databases/db');

var User = require('../models/User');
var Project = require('../models/Project');


const bcryptSaltRounds = 10;

// get all users from the database
router.get('/accounts', /*VerifyAdmin,*/ (req, res) => {
    User.find({}, {password: 0}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

router.post('/createproject', (req, res) => {
    Project.create({
        title: req.body.title,
        author_username: req.body.author,
        summary: req.body.summary,
        bid_end: Date(req.body.bid_end),
        min_budget: parseInt(req.body.min_budget),
        max_budget: parseInt(req.body.max_budget),
        assignee: null,
        completed: false,
        problematic: false,
        admin_comments: null
    }, function (err, project) {
        // console.log("done creating user");
        if (err) return res.status(500).send("There was a problem creating the project.")
        // create a token
        res.status(200).send({created: true, id: _id});
    });
});

// delete a user from the database
router.delete('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
});


router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 43200 // expires in 12 hours
        });
        res.status(200).send({auth: true, token: token});
    });
});

router.get('/logout', (req, res) => {
    res.status(200).send({auth: false, token: null});
});


// get all projects from the database
router.get('/projects', function (req, res) {
    Project.find({}, function (err, projects) {
        if (err) return res.status(500).send("There was a problem finding the projects.");
        res.status(200).send(projects);
    });
});

router.post('/register', (req, res) => {
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
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 43200 // expires in 12 hours
        });
        res.status(200).send({auth: true, token: token});
    });
});


// update user profile in database
router.put('/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

router.get('/user', (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        User.findById(decoded.id, {password: 0}, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
    });
});


module.exports = router;
