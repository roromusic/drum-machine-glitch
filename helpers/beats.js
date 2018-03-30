const db = require('../models');

exports.getBeats = async (req, res, next) => {
    try {
        const beats = await db.User.findById(req.params.id)
                      .populate({
                          path: 'beats',
                          select: {title: true, bpm: true, createdAt: true, updatedAt: true},
                          options: { sort: { 'updatedAt': -1 }}
                      })
        
        res.status(200).json(beats);
    }catch (err) {
        res.send(err);
    }  
}

exports.createBeat = async (req, res, next) => {
    const newBeat = {
        title: req.body.title,
        bpm: req.body.bpm,
        pattern: req.body.pattern,
        userId: res.locals.userId
    };

    try{
        const beat = await db.Beat.create(newBeat);
        const user = await db.User.findById(res.locals.userId);
        user.beats.push(beat.id);
        user.save();
        res.status(200).json(beat);

    }catch(err){
        res.status(400).send(err);
    }
    
}

exports.getBeat = async (req, res, next) => {
    try {
        const beat = await db.Beat.findById(req.params.beatId)
                       .populate("userId", {displayName: true, _id: true});

        res.status(200).json(beat);
    }catch(err) {
        res.status(400).send(err);
    }
}

exports.updateBeat = async(req, res, next) => {

    db.Beat.findById(req.params.beatId, (err, beat) => {
        if (err) res.send(err);
        if (beat.userId.toString() === res.locals.userId.toString()) {
            beat.title = req.body.title;
            beat.bpm = req.body.bpm;
            beat.pattern = req.body.pattern;
            beat.save((err, updatedBeat) => {
                if (err) res.send(err);
                res.send(updatedBeat);
            })
        }else {
            res.status(400).send("userId doesn't match");
        }
    });
}

exports.deleteBeat = (req, res, next) => {
    db.Beat.findById(req.params.beatId, (err, beat) => {
        if(err) res.send(err);
        if(beat.userId.toString() === res.locals.userId.toString()) {
            beat.remove();
            res.send("deleted beat");
        }else {
            res.status(400).send("userId doesn't match");
        }
    })
}

module.exports = exports;