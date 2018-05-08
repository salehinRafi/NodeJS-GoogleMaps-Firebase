var express = require('express');
var router = express.Router();
const LocController = require('../controllers/loc.controller');

router.get('/', LocController.findAll); //location/ GET

module.exports = router;