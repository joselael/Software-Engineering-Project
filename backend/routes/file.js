var express = require('express');
var multer  = require('multer')
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var User = require('../models/User');
router.use(bodyParser.urlencoded({ extended: true }));

//can't explicitly set file name
var storage = multer.diskStorage({
     destination: function(req,file,callback){
     	//if(file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
     //		var id = req.User._id;
     //	}
     //	else{
    // 		var id = req.User._id +'doc';
    // 	}
     		var path = '/Upload/test';
     		mkdirp(path,function(err){
     			if(err) console.error(err)
     			else{
     				//directory already exists
     				callback(null,dest);
				 }
				});
			},
     		filename: function(req,file,callback){
     			callback(null, file.originalname)
     		}
     	});

var upload = multer({storage : storage}).single('upload_file');

router.get('/:id', async(req,res) => {
		if(req.params.id.indexOf(doc)){
			var file = '/Upload/' + req.params.id + '/'+'.docx';
		}
		else{
			var file = '/Upload/' + req.params.id +'/' + '.jpg';
		}
		try{
			res.download(file);
		}
		catch(err){
			res.send(404);
		}
	  });


router.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.send(404);
      return;
    }
	 console.log('saved');
  });
});
//router.post('/', function (req, res) {
//  fs.writeFile("gina.jpg", JSON.stringify(obj), 'binary', (err)=>{
 //   if(err) console.log("failed");
  //  else console.log('File saved');
 // })
//});

//reading a text file
//router.get('/readSource', function (req, res) {
///    fs.readFile(req.params.readSource, function(err,data){
 //     if(err) throw err;
 //  })
 //   var file = fs.readFileSync(req.params.readSource,"utf8");
 //  console.log('success');
//});

module.exports = router;
