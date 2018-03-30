const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.URI, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
});

module.exports.User = require("./user");
module.exports.Beat = require("./beat");