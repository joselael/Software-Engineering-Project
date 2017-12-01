//SWEP: backend: app.js

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
//const cors = require('cors'); // to enable cross-origin requests



// var index = require('./routes/index');
// var users = require('./routes/users');
var routes = require('./routes/routes');
var db = require('./db');
const app = express(); // initialize app

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(errorhandler());
app.use(cors());
app.use(bodyParse.json());
app.use(bodyParser.urlEnconded({extended: false}));

// app.use('/', index);
// app.use('/users', users);
app.use('/routes', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
