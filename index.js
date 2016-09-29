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

var auth                = require(path.join(__dirname, "routes/auth")),
    room                = require(path.join(__dirname, "routes/room")),
    chat                = require(path.join(__dirname, "routes/chat"));

var bodyParser          = require("body-parser"),
    bluebird            = require("bluebird"),
    seedDB              = require(path.join(__dirname, "seedDB"));
    passport            = require("passport"),
    LocalStrategy       = require("passport-local").Strategy,
    session             = require("express-session");

    app.set('port', PORT);

var server              = http.createServer(app),
    io                  = require("socket.io").listen(server);
    mongoose.Promise    = bluebird;

    app.set("view engine", "jade");

    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({
        secret: "tomahto",
        saveUninitialized: false,
        resave: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use("/auth", auth);
    app.use("/rooms", room);
    app.use("/chats", chat);

    require(path.join(__dirname, "config/passport"))(passport);


    server.listen(app.get('port'));

    seedDB();

    app.get("/", function(req, res){
        res.redirect("/rooms");
    });

    //*-------- SOCKET EVENTS --------*//
    io.on("connection", function(socket){
        console.log("A user has entered the room");

        socket.on("enter room", function(data){

        });

        socket.on("leave room", function(data){

        });
    });
