var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('IPs');
    collection.find({},{fields:{HistoricalProgress:0}},function(e,docs){
        res.json(docs);
    });
});

router.get('/:id', function(req, res, next) {
    var db = req.db;
    var collection = db.get('IPs');
    collection.find({},{fields:{HistoricalProgress:0}},function(e,docs){
        res.json({id:req.params.id});
    });
});

module.exports = router;
