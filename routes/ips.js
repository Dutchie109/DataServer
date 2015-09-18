var express = require('express');
var router = express.Router();

/* GET IP listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('IPs');
    collection.find({},{fields:{HistoricalProgress:0}},function(e,docs){
        res.json(docs);
    });
});

/* GET specific IP. */
router.get('/:id', function(req, res, next) {
    var db = req.db;
    var collection = db.get('IPs');
    collection.findOne({IntegrityID: req.params.id},{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;
