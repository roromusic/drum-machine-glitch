const CLIENT_ID = '335931452532-9vnftvee7t5vt875ojccu92jkgbu7ndf.apps.googleusercontent.com',
      GoogleAuth = require('google-auth-library'),
      auth = new GoogleAuth,
      client = new auth.OAuth2(CLIENT_ID, '', ''),
      db = require('../models');

exports.ensureCorrectUser = (req, res, next) => {
      var token = req.params.token || req.headers.authorization.split(" ")[1];

      client.verifyIdToken(
            token,
            CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
            function (e, login) {
                  if(e){
                        res.status(400).send('not authorized');
                        return;
                  }
                  var payload = login.getPayload();
                  var userid = payload['sub'];
                  // If request specified a G Suite domain:
                  //var domain = payload['hd'];
                  if (payload.aud === CLIENT_ID) {
                        res.locals.payload = payload;
                        next();
                  }else {
                        res.json({message: "unauthorized"})
                  }
            }
      )
}

exports.subToId = async (req, res, next) => {
      try {
            const user = await db.User.findOne({ sub: res.locals.payload.sub });
            res.locals.userId = user._id;
            next();

      } catch (e) {
            res.send(e);
      }
      
}