const mongoose = require("mongoose");
const User = require("./user");

const beatSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Untitled"
    },
    bpm: {
        type: Number,
        default: 120
    },
    pattern: [],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

beatSchema.pre('remove', function(next) {
    User.findById(this.userId).then(user => {
        user.beats.remove(this.id);
        user.save().then(e => {
            next();
        });
    }).catch(err => next(err));
});

const Beat = mongoose.model('Beat', beatSchema);
module.exports = Beat;