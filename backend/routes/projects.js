const express = require('express');
const router = express.Router();

// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const db = require('../databases/db');


var Project = require('../models/Project');
var VerifyToken = require('../auth/VerifyToken');


router.post('/create', (req, res) => {
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

// get all projects from the database
router.get('/projects', VerifyToken, function (req, res) {
    Project.find({}, function (err, projects) {
        if (err) return res.status(500).send("There was a problem finding the projects.");
        res.status(200).send(projects);
    });
});

module.exports = router;
