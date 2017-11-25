const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));

const profile = [{
    username: 'lael',
    email: 'jllouis@live.com',
    url: 'http://localhost:3000'
}];

app.use((req, res, next)=>{
    console.log(`${req.method}: ${req.url}`);
    next();
})

app.use((req, res, next)=>{
    if (req.query.api_key) {
        next();
    } else {
        res.status(401).send({msg: "Not authorized"});
    }
})

app.get('/profile', (req, res) => {
    if (req.query.id) return res.send(profile[req.query.id]);
    res.send(profile);
})

app.post('/profile/', (req, res)=>{
    profile.push(req.body);
    console.log('created', profile);
    res.sendStatus(201);
})

app.put('/profile/:id', (req, res)=>{
    Object.assign(profile[req.params.id], req.body);
    console.log('updated', profile);
    res.sendStatus(204);
})

app.delete('/profile', (red, res) => {
    profile.splice(req.params.id, 1);
    res.sendStatus(204);
})

app.listen(3000);