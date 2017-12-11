const multer = require("multer");
const memoryStorage = multer.memoryStorage();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const VerifyToken = require('../auth/VerifyToken');
const upload = require('../file/fileStorage');

const m = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


router.post('/:kind', VerifyToken, m.single("file"), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
    }

    User.findById(req.userID, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        upload(req, res, user.username);

    });


});

module.exports = router;
