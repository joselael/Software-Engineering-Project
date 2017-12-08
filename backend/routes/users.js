const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Bid = require('../models/Bid');
const jwt = require('jsonwebtoken');
const VerifyAdmin = require('../auth/VerifyAdmin');
const VerifyToken = require('../auth/VerifyToken');

const bcryptSaltRounds = 10;
const config = require('../config');

// get all users from the database
router.get('/accounts', VerifyAdmin, (req, res) => {
    User.find({}, {password: 0}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});


// check password
router.post('/check', VerifyToken, (req, res) => {
    User.findById(req.userID, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        if (bcrypt.compareSync(req.body.password, user.password))
            res.status(200).send(true);
        else
            res.status(401).send(false);
    });
});

router.post('/create', (req, res) => {

    console.log(req.body);
    User.create({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: {
            value: req.body.last_name,
            visible: true
        },
        email: {
            value: req.body.email,
            visible: true
        },
        password: bcrypt.hashSync(req.body.password, bcryptSaltRounds),
        user_type: req.body.user_type,
        account_balance: req.body.account_balance,
        bids: [],
        warnings: 0,
        enabled: false,
        blacklisted: false,
        admin_message: null,
        linkedIn: {
            value: "",
            visible: true
        },
        github: {
            value: "",
            visible: true
        },
        first_login: true
    }, function (err, user) {
        // console.log("done creating user");
        if (err) return res.status(500).send("There was a problem registering the user.");
        // create a token
        let token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 43200 // expires in 12 hours
        });
        res.status(200).send({auth: true, token: token});
    });
});


// delete a user from the database
router.delete('/:id', VerifyAdmin, (req, res) => {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send([false, "There was a problem deleting the user."]);
        else res.status(200).send([true, "User was deleted."]);
    });
});

// update user profile in database, by user
router.put('/me', VerifyToken, (req, res) => {

    User.findByIdAndUpdate(req.userID, req.body, {new:true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        if (req.body.password)
            req.body.password = bcrypt.hashSync(req.body.password, bcryptSaltRounds);
        res.status(201).send(user);
    });
});

// update user profile in database, by user
router.delete('/me', VerifyToken, (req, res) => {
    if (!req.body.password)
        return res.status(401).send("Must provide password");

    User.findByIdAndUpdate(req.userID, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");

        if (!bcrypt.compareSync(bcrypt.hashSync(req.body.password, bcryptSaltRounds), user.password))
            return res.status(401).send("Authentication failed!");

        user.delete_requested = true;
        res.status(202).send("Account deletion requested!");

    });
});


// update user profile in database, by admin
router.put('/:id', VerifyAdmin, (req, res) => {
    if (req.body.password)
        req.body.password = bcrypt.hashSync(req.body.password, bcryptSaltRounds);
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(201).send(user);
    });
});


router.get('/me', VerifyToken, (req, res) => {
    console.log("received request");
    User.findById(req.userID, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });
});

// get a particular user by name, for admin
router.get('/:name', VerifyAdmin, (req, res) => {
    User.find({username: req.params.name}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });
});

// get a particular user by name, for users
router.get('/search/:name', VerifyToken, (req, res) => {
    User.find({username: req.params.name}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });
});


module.exports = router;
