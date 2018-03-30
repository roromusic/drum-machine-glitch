var db = require('../models');

exports.signin = async (req,res) => {
   //res.send(req.params);
   const payload = res.locals.payload;
   let user = await db.User.findOne({sub: payload.sub});
   if(user){
       res.status(200).json({displayName: user.displayName,
                             profileImageUrl: user.profileImageUrl,
                             id: user._id,
                             token: req.params.token
                            });
   }else {
       //sign up
       const newUser = {
           sub: payload.sub,
           displayName: payload.name,
           profileImageUrl: payload.picture
       };
       try{
        user = await db.User.create(newUser);
        res.status(200).json(user);
       }catch(err){
           res.status(400).json(err);
       }
       
   }
}