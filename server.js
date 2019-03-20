// requirements
var express = require('express');
var mongoose = require('mongoose');

var app = express();

// middleware
var bodyParser = require('body-parser');

app.use(
    bodyParser.urlencoded({extended: false})
);
app.use(
    bodyParser.json()
);

// DB Config
var db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(()=> console.log("MongoDB successfully connected."))
    .catch((err) => console.log(err));

var port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server up and runnint on port ${port} !`));
