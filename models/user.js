const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    beats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beat'
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;