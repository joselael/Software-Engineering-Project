const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('./User');
const Storage = require('@google-cloud/storage');

const projectId = 'PROJECTID';
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
const FileController = require('./file/FileController');
app.use('/files', FileController);
module.exports = router;