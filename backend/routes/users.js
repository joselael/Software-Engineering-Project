const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const VerifyAdmin = require('../auth/VerifyAdmin');
const VerifyToken = require('../auth/VerifyToken');

const bcryptSaltRounds = 10;
const config = require('../config');

// get all users from the database
router.get('/accounts', (req, res) => {
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
        bad_rater: false,
        blacklisted: false,
        admin_message: null,
        req_money: 0,
        protest_message: null,
        protest_check: false,
        linkedIn: {
            value: "",
            visible: true
        },
        github: {
            value: "",
            visible: true
        },
        first_login: true,
        reusme: null,
        picture: null
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

    User.findByIdAndUpdate(req.userID, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        if (req.body.password)
            req.body.password = bcrypt.hashSync(req.body.password, bcryptSaltRounds);
        res.status(201).send(user);
    });
});

router.put('/balance/:id', VerifyToken, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: {account_balance: req.body.balance_update}}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user's account balance.");
        else res.status(200).send([true, "Account balance updated."]);
    });
});

router.put('/rater/:name', (req, res) => {
    let total_sum = 0;
    Project.find({author: req.params.name}, function (err, projects) {
        if (projects.length === 0) {
            Project.find({'assignee.username': req.params.name}, function (err, projects) {
                for (let i = 0; i < projects.length; i++) {
                    total_sum = total_sum + projects[i].rating_assignee;
                }
                let avg = total_sum / projects.length;
                if (avg < 2 || avg > 8) {
                    User.find({username: req.params.name}, function (err, user) {
                        let user_id = user[0].id;
                        User.findByIdAndUpdate(user_id, {$set: {bad_rater: true}}, function (err, user) {
                            if (err) return res.status(500).send("There was a problem updating the user.");
                            res.status(202).send(user.bad_rater);
                        });
                    });
                }
                else {
                    User.find({username: req.params.name}, function (err, user) {
                        let user_id = user[0].id;
                        User.findByIdAndUpdate(user_id, {$set: {bad_rater: false}}, function (err, user) {
                            if (err) return res.status(500).send("There was a problem updating the user.");
                            res.status(202).send(user.bad_rater);
                        });
                    });
                }

            });
        }
        else {
            Project.find({'author': req.params.name}, function (err, projects) {
                for (let i = 0; i < projects.length; i++) {
                    total_sum = total_sum + projects[i].rating_assignee;
                }
                let avg = total_sum / projects.length;
                if (avg < 2 || avg > 8) {
                    User.find({username: req.params.name}, function (err, user) {
                        let user_id = user[0].id;
                        User.findByIdAndUpdate(user_id, {$set: {bad_rater: true}}, function (err, user) {
                            if (err) return res.status(500).send("There was a problem updating the user.");
                            res.status(202).send(user.bad_rater);
                        });
                    });
                }
                else {
                    User.find({username: req.params.name}, function (err, user) {
                        let user_id = user[0].id;
                        User.findByIdAndUpdate(user_id, {$set: {bad_rater: false}}, function (err, user) {
                            if (err) return res.status(500).send("There was a problem updating the user.");
                            res.status(202).send(user.bad_rater);
                        });
                    });
                }

            });
        }
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

router.put('/money_request/:id', VerifyToken, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: {req_money: req.body.money_amt}}, function (err, user) {
        if (err) res.status(500).send("There was a problem updating the user's request for money.");
        res.status(200).send((user.req_money.toString()));
    });
});

router.get('/warnings/:id', (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) res.status(500).send("There was a problem retrieving the user.");
        res.status(200).send((user.warnings.toString()));
    });
});

router.get('/total_clients', (req, res) => {
    User.count({user_type: 'client'}, function (err, count) {
        if (err) res.status(500).send("Could not get count.");
        res.status(200).send((count).toString());
    });
});

router.get('/total_devs', (req, res) => {
    User.count({user_type: 'developer'}, function (err, count) {
        if (err) res.status(500).send("Could not get count.");
        res.status(200).send((count).toString());
    });
});

router.get('/top_dev', (req, res) => {
    let query = User.find({user_type: 'developer'}).sort({money_made: -1}).limit(1);
    query.exec(function (err, money_maker) {
        if (err) res.status(500).send("Could not find top dev.");
        if (money_maker.length === 0) res.status(500).send("There are no devs");
        else {
            res.status(200).send({username: money_maker[0].username, picture: money_maker[0].picture});
        }
    });
});

router.get('/top_client', (req, res) => {
    let query = User.find({user_type: 'client'}).sort({num_projects: -1}).limit(1);
    query.exec(function (err, project_boss) {
        if (err) res.status(500).send("Could not find top Client");
        console.log(project_boss[0].picture)
        if (project_boss.length === 0) res.status(500).send("There are no clients");
        else {
            res.status(200).send({username: project_boss[0].username, picture: project_boss[0].picture});
        }
    });
});

//get all projects a user worked on given their username -> sends back an array of necessary info 
router.get('/history/:name', (req, res) => {
    Project.find({author: req.params.name}, function (err, projects) {
        if (projects.length === 0) {
            Project.find({'assignee.username': req.params.name}, function (err, projects) {
                if (err) return res.status(500).send("There was a problem getting user projects");
                let proj_arr = [];
                for (let i = 0; i < projects.length; i++) {
                    project_details = {
                        "title": projects[i].title,
                        "summary": projects[i].summary,
                        "rating_assignee": projects[i].rating_assignee,
                        "rating_author": projects[i].rating_author,
                        "project_end": projects[i].project_end
                    };
                    proj_arr.push(project_details);
                }
                if (err) return res.status(500).send("There was a problem getting user projects");
                res.status(200).send(proj_arr);
            });
        }
        else {
            let proj_arr = [];
            for (let i = 0; i < projects.length; i++) {
                let project_details = {
                    "title": projects[i].title,
                    "summary": projects[i].summary,
                    "rating_assignee": projects[i].rating_assignee,
                    "rating_author": projects[i].rating_author,
                    "project_end": projects[i].project_end
                };
                proj_arr.push(project_details);
            }
            if (err) return res.status(500).send("There was a problem getting user projects");
            res.status(200).send(proj_arr);
        }
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
router.get('/search/:name', (req, res) => {
    User.find({username: req.params.name}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user || user.length < 1) return res.status(404).send("No user found.");

        res.status(200).send({
            "username": user[0].username,
            "first_name": user[0].first_name,
            "last_name": (user[0].last_name.visible) ? user[0].last_name.value : null,
            "email": (user[0].email.visible) ? user[0].email.value : null,
            "linkedIn": (user[0].linkedIn.visible) ? user[0].linkedIn.value : null,
            "github": (user[0].github.visible) ? user[0].github.value : null

        });
    });
});

module.exports = router;
