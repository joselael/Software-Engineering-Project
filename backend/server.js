// swep:backend: server.js

var app = require('./app');
const PORT = 3001 || process.env.PORT;

app.listen(PORT, function() {
    console.log('Express server listening on port ' + PORT);
});
