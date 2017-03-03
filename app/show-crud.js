
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');

var showSchema = mongoose.Schema({

  showName: String

 });

var Show = mongoose.model('Show', showSchema, 'show');

//Movie
router.get('/getShow', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Show.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/getShow/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Show.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});
console.log("connected to Show");
router.post('/addShow', function(req, res){

 console.log(req.body);

  var name = req.body.showName;

  var show = new Show({

    showName: name

  });


  show.save(function(err, docs){
    if ( err ) throw err;
    console.log("Show Saved Successfully");
    res.json(docs);
  });


  })

router.delete('/deleteShow/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Show.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateShow/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Show.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      console.log(data);
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
