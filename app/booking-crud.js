var express = require('express');
var router = express.Router();
bodyParser = require('body-parser');

var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
	theatreName: String,
	cityName: String,
  moviTitle: String,
	showName: String
});

var Booking = mongoose.model('Booking',bookingSchema,'booking');

router.get('/getBooking', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Booking.find({}, function (err, docs) {
         res.json(docs);
    });
});

router.get('/getBooking/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Booking.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addBooking', function(req, res){
console.log(req.body);
console.log(req.body.booking);

var booking = new Booking({

  theatreName : req.body.TName,
  cityName: req.body.TCity,
  moviTitle: req.body.TMovie,
	showName: req.body.TShow
});

    	booking.save(function(err, docs){
     if ( err ) throw err;
     console.log("Booking Saved Successfully"+booking);
    res.json(docs);
});

});


router.delete('/deleteBooking/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Booking.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
});

router.put('/updateBooking/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
   Booking.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
});

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
