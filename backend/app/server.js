// swep:backend: server.js

var app = require('./app');
const PORT = 3001 || process.env.PORT;

// // register endpoint
// // the input validation code below is buggy (gets stuck somewhere), so I've commented it out
// app.post('/register'/*, [
//     check('username').isAlphanumeric().withMessage("invalid username").trim(),
//     check('first_name').isAlpha().withMessage("invalid first name").trim,
//     check('last_name').isAlpha().withMessage("invalid last name").trim(),
//     check('password', 'passwords must be at least 8 chars long and contain one number')
//     .isLength({min : 5}).matches(/\d/)
// ]*/, function(req, res) {
//     User.create({
//       username: req.body.username,
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, bcryptSaltRounds), // save hash instead of plaintext
//       user_type: req.body.user_type,
//       enabled: false,
//       blacklisted: false,
//       admin_message: null
//     }, function (err, user) {
//       // console.log("done creating user");
//       if (err) return res.status(500).send("There was a problem registering the user.");
//       // create a token
//       var token = jwt.sign({ id: user._id }, config.secret, {
//         expiresIn: 43200 // expires in 12 hours
//       });
//       res.status(200).send({ auth: true, token: token });
//     });
//   });
//
//
// app.post('/createproject', VerifyToken, function(req, res) {
//   Project.create({
//     author_username: req.body.author,
//     summary: req.body.summary,
//     details: req.body.details,
//     bid_end: Date(req.body.bid_end),
//     min_budget: parseInt(req.body.min_budget),
//     max_budget: parseInt(req.body.max_budget),
//     assignee: null,
//     completed: false,
//     problematic: false,
//     admin_comments: null
//   }, function (err, project) {
//     if (err) return res.status(500).send("There was a problem creating the project.");
//     // create a token
//     res.status(200).send({ created: true, id: _id });
//   });
// });
//
//
// app.post('/login', function(req, res) {
//     User.findOne({ username: req.body.username }, function (err, user) {
//       if (err) return res.status(500).send('Error on the server.');
//       if (!user) return res.status(404).send('No user found.');
//       var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//       if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
//       var token = jwt.sign({ id: user._id }, config.secret, {
//         expiresIn: 43200 // expires in 12 hours
//       });
//       res.status(200).send({ auth: true, token: token });
//     });
//   });
//
//
//   // get all users from the database
//   app.get('/accounts', VerifyAdmin, function (req, res) {
//     User.find({},{password: 0}, function (err, users) {
//         if (err) return res.status(500).send("There was a problem finding the users.");
//         res.status(200).send(users);
//     });
// });
//
//
//   // get all projects from the database
//   app.get('/projects', VerifyToken, function (req, res) {
//     Project.find({}, function (err, projects) {
//         if (err) return res.status(500).send("There was a problem finding the projects.");
//         res.status(200).send(projects);
//     });
// });
//
//
// // delete a user from the database
// app.delete('/delete/:id', VerifyAdmin, function (req, res) {
//   User.findByIdAndRemove(req.params.id, function (err, user) {
//       if (err) return res.status(500).send("There was a problem deleting the user.");
//       res.status(200).send("User: "+ user.name +" was deleted.");
//   });
// });
//
//
// // update user profile in database
// app.put('/update/:id', VerifyAdmin, function (req, res) {
//   User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//       if (err) return res.status(500).send("There was a problem updating the user.");
//       res.status(200).send(user);
//   });
// });
//
//
//   app.get('/logout', function(req, res) {
//     res.status(200).send({ auth: false, token: null });
//   });
//
//
// //get user by token
// app.get('/user', VerifyToken, function(req, res) {
//     // var token = req.headers['x-access-token'];
//     // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
//
//     // jwt.verify(token, config.secret, function(err, decoded) {
//     //   if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
//
//       User.findById(decoded.id, {password: 0}, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//
//          res.status(200).send(user);
//       });
//     });
//
//   // app.use(function (user, req, res, next) {
//   //   res.status(200).send(user);
//   // })
//
//
// // if endpoint doesn't exist
// app.all('/*', function(req, res) {
//     res.status(404).send("Not found");
// });


app.listen(PORT, function() {
    console.log('Express server listening on port ' + PORT);
});
