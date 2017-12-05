const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const VerifyToken = require('../auth/VerifyToken');
const VerifyAdmin = require('../auth/VerifyAdmin');

// router.post('/bid/:id', VerifyToken, (req, res) =>
// {
//     Project.find({}, function (err, proj) {
//         if (err) return res.status(500).send("There was a problem finding the projects.");
//         var project = proj;
//
//     });})

router.post('/create', (req, res) => {
    console.log(req.body);
    Project.create({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        details: String,
        bid_end: new Date(req.body.bid_end),
        max_budget: parseInt(req.body.max_budget),
        bidders: [],
        assignee: null,
        completed: false,
        problematic: false,
        admin_comments: null
    }, function (err, project) {
        if (err) return res.status(500).send("There was a problem creating the project.")
        // create a token
        res.status(200).send({created: true, id: project._id});
    });
});

// router.post('/bid/:id', VerifyToken, (req, res) => {
//
// });


// get all projects from the database
router.get('/projects', function (req, res) {
    Project.find({}, function (err, projects) {
        if (err) return res.status(500).send("There was a problem finding the projects.");
        res.status(200).send(projects);
    });
});

// delete project
router.delete('/:id', VerifyAdmin, (req, res) => {
    Project.findByIdAndRemove(req.params.id, function (err, project) {
        if (err) return res.status(500).send([false, "There was a problem deleting the project."]);
        else res.status(200).send([true, "Project was deleted."]);
    });
});

// update project
router.put('/:id', VerifyAdmin, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, project) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(project);
    });
});

// find projects by specific user
router.get('/search/:user', VerifyToken, (req, res) => {
    Project.find({author: req.params.user}, function (err, project) {
        if (err) return res.status(500).send("There was a problem finding the project.");
        if (!project) return res.status(404).send("No project found.");

        res.status(200).send(project);
    });
});

// find project by title
router.get('/:title', VerifyToken, (req, res) => {
    Project.find({title: req.params.title}, function (err, project) {
        if (err) return res.status(500).send("There was a problem finding the project.");
        if (!project) return res.status(404).send("No project found.");

        res.status(200).send(project);
    });
});

module.exports = router;
