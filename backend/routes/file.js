import multer, {memoryStorage} from "multer";

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Project = require('../models/Project');
const Bid = require('../models/Bid');
const jwt = require('jsonwebtoken');
const VerifyAdmin = require('../auth/VerifyAdmin');
const VerifyToken = require('../auth/VerifyToken');
const upload = require('../file/fileStorage');

const m = multer({
    storage: memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


router.post('//:kind', VerifyToken, m.single("file"), (req, res) => {
    if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
    }

    var user_id;
    User.findById(req.userID, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        user_id = user.username;
    });

    upload(req.file, user_id + req.param.kind, req.file.mimetype, req.file.buffer);

});

module.exports = router;
