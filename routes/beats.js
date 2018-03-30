const express = require('express'),
      router = express.Router({mergeParams: true}),
      helpers = require('../helpers/beats'),
      auth = require('../middleware/auth');

    router.route('/')
    .get(helpers.getBeats)
    .post(auth.ensureCorrectUser, auth.subToId, helpers.createBeat);

    router.route('/:beatId')
    .get(helpers.getBeat)
    .put(auth.ensureCorrectUser, auth.subToId, helpers.updateBeat)
    .delete(auth.ensureCorrectUser, auth.subToId, helpers.deleteBeat);

    module.exports = router;