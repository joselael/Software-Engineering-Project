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
        author_id: req.body.author_id,
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
        completed: false,
        rating: null,
        bidding_in_progress: true,
        require_review: false, require_rating: false,
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

//super user approval for project
router.put('/approve/:id', VerifyAdmin, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, project) {
        if (err) return res.status(500).send("There was a problem updating the project.");
        res.status(200).send(project);
    });
    var assignee = User.findById(assingee.user_id);
    var bid_amount = Bid.findById(Project.findById(req.params.id).assingee._bid).amount;
    var initial_transfer = bid_amount/2;
    var author_id = Project.findById(req.params.id).author_id;
    var account_balance_author = User.findById(author_id).account_balance;
    var account_balance_assingee = Project.findById(req.params.id).assignee.account_balance;
    User.findByIdAndUpdate((Project.findById(req.params.id).assignee._id), {$set:{account_balance : (account_balance_assignee + intial_transfer)}}, function(err, user){
            if(err) return res.status(500).send("There was a problem updating account balance for assignee.");
            res.status(200).send(project);
        });
    User.findByIdAndUpdate(author_id,{$set:{account_balance: (account_balance_author - inital_transfer)}}, function(err,user2){
        if(err) return res.status(500).send("There was a problem updating account balance for author.");
        res.status(200).send(project);
    });
    User.findByIdAndUpdate()    
});

//for final money transfer upon project completion
router.put('/deliver/:id', VerifyAdmin, (req,res) => {
    var project = Project.findById(req.params.id);
    var assignee = User.findById(assingee._id);
    var su_charge = Bid.findById(project.assignee._bid).amount * .05;
    var final_transfer = (Bid.findById(project.assignee._bid).amount)/2;
    var account_balance_author = User.findById(author_id).account_balance;
    var account_balance_assingee = assignee.account_balance;
    var total_charge_author = ((Bid.findById(project.assignee._bid).amount)/2) + su_charge;
    User.findByIdAndUpdate(project.author_id, {$set:{account_balance:(account_balance_author - total_charge_author)}}, function(err,user){
        if(err) return res.status(500).send("There was a problem updating account balance for author.");
        res.status(200).send(project);
    });
    User.findByIdAndUpdate(assignee,{$set:{account_balance: (account_balance_assingee - su_charge)}}, function(err,user2){
        if(err) return res.status(500).send("There was a problem updating account balance for assignee.");
        res.status(200).send(project);
    });
    var super_user_balance = User.findOne({ 'username': 'yong' }).account_balance;
    User.Update({name : 'yong'},{$set:{account_balance : (super_user_balance + (su_charge * 2))}},callback);
    function callback (err, numAffected) {
        if (err) return res.status(500).send("There was a problem updating account for super user.");
        res.status(200).send(project);
    };
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

//Rating endpoint for clients to rate the project
router.put('/rating/:id', VerifyToken, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body.rating, {new: true}, function (err, project) {
        if (err) return res.status(500).send("There was a problem updating the project.");
        //Rating logic
        res.status(200).send(project);
    });
});

module.exports = router;
