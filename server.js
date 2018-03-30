const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    path = require('path'),
    env = process.argv[2] || 'dev';

const authRoutes = require("./routes/auth"),
      auth = require('./middleware/auth'),
      beatRoutes = require('./routes/beats'),
      latestRoutes = require('./routes/latest');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    switch (env) {
        case 'dev':
            res.sendFile(path.join(__dirname + '/dev.html'));
            break;
        case 'prod':
            res.json({ message: "Make a POST request to /api/auth/signin to signup" });
    }
})

app.use("/api/auth/signin/:token", auth.ensureCorrectUser, authRoutes);

app.use("/api/users/:id/beats", beatRoutes);

app.use("/api/latest", latestRoutes);


const PORT = 8081;
app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});