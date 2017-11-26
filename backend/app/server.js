const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const bcrypt = require('bcrypt');

const bcryptSaltRounds = 10

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

/* debug */
const ddb = {}; //debug database
ddb.accounts = {};

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
app.post('/register'/*, [
    check('username').isAlphanumeric().withMessage("invalid username").trim(),
    check('first_name').isAlpha().withMessage("invalid first name").trim,
    check('last_name').isAlpha().withMessage("invalid last name").trim(),
    check('password', 'passwords must be at least 8 chars long and contain one number')
    .isLength({min : 5}).matches(/\d/)
]*/, (req, res, next) => {

    let acc_id = Object.keys(ddb.accounts).length; 
    let user_obj = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        /** save hash of password, actual plaintext is never saved in database */
        password: bcrypt.hashSync(req.body.password, bcryptSaltRounds),
        id: acc_id,
        user_type: null,
        enabled: false /* accounts is disabled until admin enables it */,
        admin_message: null
    }

    ddb.accounts[req.body.username] = user_obj; /* save user into db */
    res.status(201).send({id:acc_id});
})

app.post('/login', (req, res) => {
    if(!(req.body.username in ddb.accounts)) return res.status(401).send({
        msg: "Not Authorized."
    });

    /* Compare hash of login password, with has of registered password */
    if (bcrypt.compareSync(req.body.password, ddb.accounts[req.body.username].password, function(error, res){
        console.log("in compareSync");
        if (error) return res.status(400).send({
            msg: "Invalid request."
        });   
    }))

    /** return  */
     res.status(201).send({
        username: ddb.accounts[req.body.username].username,
        first_name: ddb.accounts[req.body.username].first_name,
        last_name: ddb.accounts[req.body.username].last_name,
        id: ddb.accounts[req.body.username].id
    });
else return res.status(401).send({
    msg: "Not Authorized."
});

} )
/* get user accounts, this should presumably only be callable by admin */
app.get('/accounts', (req, res) => {
    res.status(200).send(ddb.accounts);
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

app.get('/')

app.listen(PORT);
