var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var User = require('./User');
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/', function (req, res) {
  fs.writeFile("gina.jpg", JSON.stringify(obj), 'binary', (err)=>{
    if(err) console.log("failed");
    else console.log('File saved');
  })
});

router.get('/', function (req, res) {
    fs.readFile('image.jpg', function(err,data){
      if(err) throw err;
      res.writeHead(200,{'Content-Type' : 'image/jpeg'});
      res.end(data);
    }).listen(8124);
    console.log('success');
});
var FileController = require('./file/FileController');
app.use('/files', FileController);
module.exports = router;