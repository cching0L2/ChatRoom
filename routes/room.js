var express = require("express"),
    app     = express(),
    router  = express.Router(),
    Room    = require("../model/RoomModel");

    router.get("/", function(req, res){
        console.log("rooms/get req.user");
        console.log(req.user);
        Room.find().then(function(rooms){
            res.render("lobby", {
                rooms: rooms,
                user: req.user
            });
        });
    });

    router.get("/:id", function(req, res){

    });

module.exports = router;
