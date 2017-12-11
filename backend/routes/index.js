const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

User = require('../models/User');
const config = require('../config');

router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        if (!bcrypt.compareSync(req.body.password, user.password))
            return res.status(401).send({auth: false, token: null});

        let token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 43200 // expires in 12 hours
        });
        res.status(200).send({auth: true, token: token});
    });
});

router.get('/logout', (req, res) => {
    res.status(200).send({auth: false, token: null});
});

module.exports = router;
