var express = require("express");
var router = express.Router({mergeParams: true});
var db = require("../models");
var helpers = require('../helpers/auth');

router.post('/', helpers.signin);

module.exports = router;