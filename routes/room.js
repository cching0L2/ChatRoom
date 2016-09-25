var express = require("express"),
    app     = express(),
    router  = express.Router(),
    Room    = require("../model/RoomModel");

    router.get("/", function(req, res){
        Room.find().then(function(rooms){
            res.render("lobby", {
                rooms: rooms
            });
        });
    });

    router.get("/:id", function(req, res){

    });

module.exports = router;
