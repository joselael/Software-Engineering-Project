const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Bid = require('../models/Bid');
const VerifyToken = require('../auth/VerifyToken');
const VerifyAdmin = require('../auth/VerifyAdmin');


//project/bid endpoint, to allow users to post bids given the projectid
router.post('/bid/:id', VerifyToken, (req, res) => {

    Bid.create({
        author: req.body.author,
        amount: parseInt(req.body.amount),
        description: req.body.description
    }, (err, bid) => {
        if (err) {
            console.log(err);
            return res.status(500).send("There was a problem creating the bid");
        } else
            Project.findById(req.params.id, (err, proj) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("There was a problem getting the project");

                } else {
                    proj.bids.push(bid);
                    proj.save();
                }

            });
    });// end Bid.create()


    return res.status(201).send("bid created!");
}); // end router.post()

// to get bids by ID
router.get('/bid/:id', VerifyToken, (req, res) => {
    Bid.findById(req.params.id, (err, bid) => {
        if (err) return res.status(500).send("Problem while getting the bid");

        return res.status(200).send(bid);
    });
});

router.post('/create', VerifyToken, (req, res) => {
    if (!req.body.bid_start)
        req.body.bid_start = Date.now();

    Project.create({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        details: req.body.details,
        bid_end: new Date(req.body.bid_end),
        bid_start: new Date(req.body.bid_start),
        project_end: new Date(req.body.project_end),
        max_budget: parseInt(req.body.max_budget),
        bids: [],
        assignee: null,
        assignee_username: "",
        completed: false,
        rating: null,
        bidding_in_progress: true,
        require_review: false,
        reason_for_selection: "",
        problematic: false,
        admin_comments: null
    }, function (err, project) {
        if (err) {
            console.log(err);
            return res.status(500).send("There was a problem creating the project.")
        }
        // create a token
        res.status(201).send({created: true, id: project._id});
    });
});


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
        else return res.status(200).send([true, "Project was deleted."]);
    });
});

// update project
router.put('/:id', VerifyToken, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, project) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(project);
    });
});

router.put('/approve/:id', VerifyAdmin, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, project) {
        if (err) return res.status(500).send("There was a problem updating the project.");
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
