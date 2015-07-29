var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var util = require('util')
var jsonfile = require('jsonfile')
var util = require('util')


/*
 * GET map waypoints
 */
router.get('/', function(req, res) {
    var query = {
        "originPort" : req.param('originPort'),
        "destinationPort" : req.param('destinationPort')
    };

    if (req.param.ship) query.ship = req.param.ship;
    if (req.param.originCall) query.originCall = new Date(req.param.originCall);
    if (req.param.destinationCall) query.destinationCall = new Date(req.param.destinationCall);

    var db = req.db;
    var collection = db.get('waypoints');

    collection.find(query,function(e,docs){
        res.json(docs);
    });
});

/*
 * GET all combinations for a given origin
 */

router.get('/combinations', function(req, res) {
    var file = '/Users/climboid/mck/costa/google-map-ship-path/scripts/dataset.json'
    jsonfile.readFile(file, function(err, obj) {
        res.json(obj)
    });
});


module.exports = router;