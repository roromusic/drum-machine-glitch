const db = require('../models');

exports.getLatest = async (req, res) => {
    try {
        const latest = await db.Beat.find().sort({createdAt: -1}).limit(1)
                       .populate("userId", {_id: true, displayName: true, profileImageUrl: true});

        res.status(200).json(latest);
        
    } catch(err) {
        res.status(400).send(err);
    }
}

module.exports = exports;