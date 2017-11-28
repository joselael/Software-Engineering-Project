var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/User');

function verifyAdmin(req, res, next) {
    var token = req.headers['x-access-token'];
     if(!token)
        return res.status(403).send({auth: false, message: 'No token provided.'});

        jwt.verify(token, config.secret, function(err, decoded) {
            if (err)
                return res.status(500).send({auth: false, message: "Failed to authenticate token."});
            
            req.userID = decoded.id;
        });

        User.findById(decoded.id, {password: 0}, (err, user) => {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if(!user) return res.status(404).send("No such user.");
            if(user.user_type != "SU")
                return res.status(401).send("Unauthorized!");
            
            next();
        });
}

module.exports = verifyAdmin;
