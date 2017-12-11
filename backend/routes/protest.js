const express = require('express');
const router = express.Router();
const User = require('../models/User');
const VerifyAdmin = require('../auth/VerifyAdmin');
const VerifyToken = require('../auth/VerifyToken');


router.put('/:id', VerifyToken, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            protest_message: req.body.message,
            protest_check: true
        }
    }, function (err, user) {
        if (err) res.status(500).send("There was a problem retrieving the user.");
        res.status(200).send(user);
    });
});

router.get('/:id', VerifyToken, (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) res.status(500).send("There was a problem retrieving the user.");
        res.status(200).send(user.protest_message);
    });
});

router.put('/warning_update/:id', VerifyAdmin, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: {protest_message: "", protest_check: false}}, function (err, user) {
        if (err) res.status(500).send("There was a problem updating the protest info for the user.");
        else {
            console.log(user);
            if (req.body.warning === "remove") {
                let warning_update = user.warnings - 1;
                user.set({warnings: warning_update});
                user.set({blacklist: false});
                user.save(function (err, warnings) {
                    if (err) return handleError(err);
                    res.send(user.warnings.toString());
                });
            }
            else {
                res.status(200).send(user);
            }
        }
    });
});

module.exports = router;
