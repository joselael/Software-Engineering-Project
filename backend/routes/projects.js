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
        require_review: false,
        require_rating: false,
        reason_for_selection: "",
        problematic: false,
        admin_comments: null,
        author_comments: "",
        assignee_comments: ""
    }, function (err, project) {
        if (err) {
            console.log(err);
            return res.status(500).send("There was a problem creating the project.")
        }
        //update author project count
        User.find({username: req.body.author}, (err1, author) => {
            let author_id = author[0]._id;
            let num_projects = author[0].number_projects;
            User.findByIdAndUpdate(author_id, {$set: {num_projects: num_projects + 1}}, function (err, project) {
                if (err) return res.status(500).send("There was a problem updating the number of projects for the author.");
                // create a token
                res.status(201).send({created: true, id: project._id});
            });
        });
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
router.put('/approve/:id', VerifyToken, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, project) {
        if (err) return res.status(404).send("There was a problem updating the project.");
        else {
            User.findById(project.assignee.user_id, (err1, assig) => {
                let account_balance_assignee = assig.account_balance;
                let assig_id = assig.id;
                let money_made = assig.money_made;
                User.find({username: project.author}, function (err2, author) {
                    let account_balance_author = author[0].account_balance;
                    let auth_id = author[0]._id;
                    Bid.find({_id: project.assignee.bid_id}, function (err2, final_bid) {
                        let bid_amount = final_bid[0].amount;
                        let initial_transfer = bid_amount / 2;
                        let acct_balance_assig = account_balance_assignee + initial_transfer;
                        let acct_balance_author = account_balance_author - initial_transfer;
                        let money_made_assig = money_made + initial_transfer;
                        //console.log(initial_transfer)
                        User.findByIdAndUpdate(assig_id, {$set: {account_balance: acct_balance_assig}}, {new: true}, function (err, user) {
                            //console.log(user)
                            if (err) return res.status(500).send("There was a problem updating account balance for assignee.");
                            else {
                                User.findByIdAndUpdate(assig_id, {$set: {money_made: money_made_assig}}, {new: true}, function (err, user) {
                                    //console.log(user)
                                    if (err) return res.status(500).send("There was a problem updating money made for assignee.");
                                    else {

                                        //console.log(auth_id)
                                        User.findByIdAndUpdate(auth_id, {$set: {account_balance: acct_balance_author}}, function (err, user2) {
                                            if (err) return res.status(500).send("There was a problem updating account balance for author.");
                                        });
                                    }
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
//rating api endpoint for the author or client 
router.put('/rating/:id', VerifyToken, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, project) {
        if (req.body.rating_author >= 3) {
            User.findById(project.assignee.user_id, (err1, assig) => {
                let money_made = assig.money_made;
                let account_balance_assignee = assig.account_balance;
                let assignee = assig._id;

                assig.project_count += 1;
                assig.average_rating = (assig.average_rating * ((assig.project_count - 1) / (assig.project_count)) + (req.body.rating_author * (1 / assig.project_count)));

                if (assig.project_count >= 5 && assig.average_rating <= 2) {
                    assig.warnings += 1
                }
                assig.save();

                User.find({username: project.author}, function (err2, author) {
                    let account_balance_author = author[0].account_balance;
                    let author_id = author[0]._id;
                    Bid.findById(project.assignee.bid_id, function (err2, final_bid) {
                        let bid_amount = final_bid.amount;
                        let final_transfer = bid_amount / 2;
                        let su_charge = final_transfer * .05;
                        let total_charge_author = final_transfer + su_charge;
                        let update_author_acct = account_balance_author - total_charge_author;
                        //Find the author
                        User.findOneAndUpdate({username: project.author}, {$set: {account_balance: update_author_acct}}, function (err, user) {
                            //console.log(user)
                            if (err) return res.status(500).send("There was a problem updating account balance for author.");
                            else {
                                User.findByIdAndUpdate(assig._id, {$set: {money_made: (money_made + final_transfer)}}, function (err, user) {
                                    //console.log(user)
                                    if (err) return res.status(500).send("There was a problem updating money made for assignee.");
                                    else {
                                        User.findByIdAndUpdate(assignee, {$set: {account_balance: ((account_balance_assignee + final_transfer) - su_charge)}}, function (err, user2) {
                                            if (err) return res.status(500).send("There was a problem updating account balance for assignee.");
                                            else {
                                                User.find({username: 'admin'}, (err, su) => {
                                                    let super_user_balance = su[0].account_balance;
                                                    let super_user_id = su[0]._id;
                                                    User.findByIdAndUpdate(super_user_id, {$set: {account_balance: (super_user_balance + (su_charge * 2))}}, (err, su) => {
                                                        if (err) return res.status(500).send("There was a problem updating account for super user");
                                                        res.status(200).send("Transaction Finalized")
                                                    });
                                                });
                                            }

                                        });
                                    }
                                });
                            }
                        });
                    });
                });
            });
        }
        else {
            //Alert the user that there is a problem within the project
            User.findById(project.assignee.user_id, (err, user) => {
                if (err) return res.status(500).send("There was a problem updating the user");

                project.problematic = true;
                project.save((err) => {
                    console.log(err);
                    if (err) return res.status(500).send("There was a problem saving the project");
                    res.status(200).send("Alerted the admin")

                });
            });
        }
    });
});

//Only touch the average rating after super user approve ratings
router.put('/penalize_project/:id', VerifyAdmin, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, {
        $set: {
            admin_comments: req.body.admin_comments,
            problematic: false,
            rating_author: req.body.admin_rating
        }
    }, {new: true}, (err, project) => {
        if (err) return res.status(500).send("There was a problem penalizing");
        User.findById(project.assignee.user_id, (err, user) => {
            if (err) return res.status(500).send("There was a problem updating user");
            if (project.rating_author >= 3) {
                //Don't charge the penalty money and give the rest half to developer
                Bid.findById(project.assignee.bid_id, (err, final_bid) => {

                    //Super user fee
                    let final_transfer = final_bid.amount / 2;
                    let su_charge = final_transfer * .05;
                    let total_charge_author = final_transfer + su_charge;

                    //Increase project count and rate the user
                    user.project_count += 1;
                    user.average_rating = (user.average_rating * ((user.project_count - 1) / (user.project_count)) + (req.body.rating * (1 / user.project_count)));

                    //If average is bad, then give warning to user
                    if (user.project_count >= 5 && user.average_rating <= 2) {
                        user.warnings += 1
                    }

                    //Give the money to developer
                    user.account_balance += (final_transfer - su_charge);
                    user.save();
                    //Find the author then charge like normal
                    User.find({username: project.author}, (err, author) => {
                        author[0].account_balance -= total_charge_author;
                        author[0].save();

                        res.status(200).send("Wrongly Accused")
                    })
                })
            }

            else if (project.rating_author < 3) {
                //Charge penalty then put back penalty money to author 
                user.account_balance -= req.body.penalty;
                user.save();
                //res.status(200).send(user)
                User.find({username: project.author}, (err, author) => {
                    console.log(author);
                    if (err) return res.status(500).send("There was a problem updating user");
                    author[0].account_balance += req.body.penalty;
                    author[0].save();
                    //
                    res.status(200).send("Penalized developer")
                })
            }
        })
    })
});

//Developer can rate client after project is finished
router.put('/rate_client/:id', VerifyToken, (req, res) => {
    Project.findByIdAndUpdate(req.params.id, {$set: {rating_assignee: req.body.rating}}, {new: true}, (err, project) => {
//        console.log(project)
        //Error catch
        if (err) return res.status(500).send("There was a problem finding the project.");
        if (!project) return res.status(404).send("No project found");

        //Find author then increate warning if the rating is less than 3
        User.findOne({username: project.author}, (err, user) => {
            if (err) return res.status(500).send("There was a problem finding author");

            user.project_count += 1;
            user.average_rating = (user.average_rating * ((user.project_count - 1) / (user.project_count)) + (req.body.rating * (1 / user.project_count)));

            if (user.project_count >= 5 && user.average_rating <= 2) {
                user.warnings += 1
            }

            user.save();
            res.status(200).send(project)
        })
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
