const mongoose = require('mongoose');  // to connect to cloud hosted NoSQL database
mongoose.connect('mongodb://nodejsapp:dllmz322squad@ds119436.mlab.com:19436/swepdb', {useMongoClient: true});
