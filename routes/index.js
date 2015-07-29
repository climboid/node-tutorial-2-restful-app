var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var util = require('util')

/* GET home page. */
router.get('/', function(req, res) {
  var file = '/Users/climboid/mck/costa/google-map-ship-path/scripts/dataset.json'
  jsonfile.readFile(file, function(err, obj) {
    res.render('index', obj)
  });
});

module.exports = router;