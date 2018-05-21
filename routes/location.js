var express = require('express');
var router = express.Router();
const LocController = require('../controllers/loc.controller');

router.get('/find', LocController.findAll); //location/ GET
router.get('/add', LocController.addNew); //location/ GET

module.exports = router;