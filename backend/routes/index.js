const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const db = require('../databases/db');


router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});
        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 43200 // expires in 12 hours
        });
        res.status(200).send({auth: true, token: token});
    });
});

router.get('/logout', (req, res) => {
    res.status(200).send({auth: false, token: null});
});

module.exports = router;
