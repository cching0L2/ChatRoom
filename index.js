var express             = require("express"),
    app                 = express(),
    http                = require("http"),
    path                = require("path"),
    PORT                = 3000,
    mongoose            = require("mongoose"),
    setupMongoose       = require(path.join(__dirname, "setupMongoose"));
    setupMongoose();

var Room                = require(path.join(__dirname, "model/RoomModel")),
    User                = require(path.join(__dirname, "model/UserModel")),
    Message             = require(path.join(__dirname, "model/MessageModel"));


var bodyParser          = require("body-parser"),
    bluebird            = require("bluebird"),
    seedDB              = require(path.join(__dirname, "seedDB"));

    app.set('port', PORT);

var server              = http.createServer(app),
    io                  = require("socket.io").listen(server);
    mongoose.Promise    = bluebird;

    server.listen(app.get('port'));
    app.set("view engine", "jade");

    seedDB();

    app.get("/", function(req, res){
        res.redirect("/index");
    });

    app.get("/index", function(req, res){
        Room.findOne().then(function(room){
            console.log(room);
            res.render("lobby", {room: room});
        });
    });
