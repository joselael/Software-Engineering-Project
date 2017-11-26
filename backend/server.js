const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errohandler');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

/* debug */
const ddb = {}; //debug database
ddb.accounts = [];

/* logging middleware, for debugging */ 
// app.use((req, res, next)=>{
//     console.log(`${req.method}: ${req.url}`);
//     next();
// })

/* auth middleware */ 
// app.use((req, res, next)=>{
//     if (req.query.api_key) {
//         next();
//     } else {
//         res.status(401).send({msg: "Not authorized"});
//     }
// })

// register endpoint
app.post('/register', [
    check('username').isAlphanumeric().withMessage("invalid username").trim(),
    check('first_name').isAlpha().withMessage("invalid first name").trim,
    check('last_name').isAlpha().withMessage("invalid last name").trim(),
    check('password', 'passwords must be at least 8 chars long and contain one number')
    .isLength({min : 5}).matches(/\d/)
], (req, res, next) => {

    //hash pw
    var pwhash; 
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        pwhash = hash;
    })

    let acc_id = ddb.accounts.length; 

    let user_obj = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: pwhash,
        id: acc_id,
        enabled: false /* accounts is disabled until admin enables it */
    }

    ddb.accounts.push(user_obj); /* save user into db */
    req.status(201).send({id:acc_id});
})

app.get('/login', (req, res) => {

} )
/* get user accounts, this should presumably only be callable by admin */
app.get('/accounts', (req, res) => {
    res.setatus(200).send(ddb.accounts);

})

/* update account info, also should only be callable by admin */
app.put('/accounts/:id', (req, res)=>{
    store.accounts[req.params.id] = req.body;
    res.status(200).send(store.accounts[req.params.id]);
})

/* delete account, only callable by admin */
app.delete('/accounts/:id', (req, res) => {
    ddb.accounts.splice(req.params.id, 1);
    res.status(204).send();
})

app.listen(PORT);