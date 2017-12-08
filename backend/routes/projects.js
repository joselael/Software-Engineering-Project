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
        rating_author: 0,
        rating_assignee: 0,
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
router.put('/approve/:id', (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, project) {
        if (err) return res.status(404).send("There was a problem updating the project.");
        else{
        User.findById(project.assignee.user_id, (err1, assig)=>{
            var account_balance_assignee = assig.account_balance;
            var assig_id = assig.id;
            User.find({username: project.author}, function (err2, author) {
                var account_balance_author = author[0].account_balance;
                var auth_id = author[0]._id;
                Bid.find({_id: project.assignee.bid_id}, function (err2, final_bid) {
                    var bid_amount = final_bid[0].amount;
                    var initial_transfer = bid_amount/2;
                    //console.log(initial_transfer)
                    User.findByIdAndUpdate(assig_id, {$set:{account_balance : (account_balance_assignee + initial_transfer)}}, {new:true}, function(err, user){
                        //console.log(user)
                        if(err) return res.status(500).send("There was a problem updating account balance for assignee.");
                        else{
                            //console.log(auth_id)
                        User.findByIdAndUpdate(auth_id,{$set:{account_balance: (account_balance_author - initial_transfer)}}, function(err,user2){
                            if(err) return res.status(500).send("There was a problem updating account balance for author.");
                        });
                        }
                        res.status(200).send(project)
                    });
                });
            });  
        });
        }
    });
});

//for final money transfer upon project completion
//rating api endpoint
router.put('/rating/:id', (req,res) => {
    if (req.body.rating_author >= 3)
        Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, project) {
            User.findById(project.assignee.user_id, (err1, assig)=>{
                var account_balance_assignee = assig.account_balance;
                var assignee = assig._id;
                User.find({username: project.author}, function (err2, author) {
                    var account_balance_author = author[0].account_balance;
                    var author_id = author[0]._id;
                    Bid.findById(project.assignee.bid_id, function (err2, final_bid) {
                        var bid_amount = final_bid.amount;
                        var final_transfer = bid_amount/2;
                        var su_charge = final_transfer * .05;
                        var total_charge_author = final_transfer + su_charge;
                        User.findByIdAndUpdate(project.author_id, {$set:{account_balance:(account_balance_author - total_charge_author)}}, function(err,user){
                            if(err) return res.status(500).send("There was a problem updating account balance for author.");
                            else{
                                User.findByIdAndUpdate(assignee,{$set:{account_balance: (account_balance_assignee - su_charge)}}, function(err,user2){
                                    if(err) return res.status(500).send("There was a problem updating account balance for assignee.");
                                    else{
                                        User.find({username:'yong'}, (err, su) => {
                                            var super_user_balance = su[0].account_balance;
                                            var super_user_id = su[0]._id
                                            User.findByIdAndUpdate(super_user_id, {$set:{account_balance: (super_user_balance + su_charge * 2)}}, (err, su) => {
                                                if (err) return res.status(500).send("There was a problem updating account for super user")
                                                res.status(200).send(su)
                                            }
                                        )
                                        } )
                                    }
                                    });
                                }
                            });
                        });
                    });
                });   
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
