const express = require('express'),
      router = express.Router({mergeParams: true}),
      helpers = require('../helpers/latest');

    router.route('/')
    .get(helpers.getLatest)

    module.exports = router;