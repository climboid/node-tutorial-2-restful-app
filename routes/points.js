var express = require('express');
var router = express.Router();


/*
 * GET map waypoints
 */
router.get('/', function(req, res) {
    var from = req.param('from');
    var to = req.param('to');
    var ship = req.param('ship');
    var query = {
        "originPort" : from,
        "destinationPort" : to,
        "ship" : ship
    };

    var db = req.db;
    var collection = db.get('waypoints');
    collection.find(query,function(e,docs){
        res.json(docs);
    });
});


module.exports = router;