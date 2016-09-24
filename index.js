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

    app.set("view engine", "jade");
    app.use(express.static("public"));
    server.listen(app.get('port'));

    seedDB();

    app.get("/", function(req, res){
        res.redirect("/rooms");
    });

    app.get("/rooms", function(req, res){
        //TODO: get list of all rooms
        Room.find().then(function(rooms){
            res.render("lobby", {
              rooms: rooms
            });
        });
    });

    app.get("/rooms/:id", function(req, res){
        // TODO: after user has selected a room, redirect, load all chats, and make user "join" that channel on socket.io
    });

    //*-------- SOCKET EVENTS --------*//
    io.on("connection", function(socket){
        console.log("A user has entered the room");

        socket.on("enter room", function(data){

        });

        socket.on("leave room", function(data){

        });
    });
