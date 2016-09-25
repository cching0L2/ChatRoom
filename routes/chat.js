var express = require("express"),
    app     = express(),
    router  = express.Router(),
    Message = require("../model/MessageModel");

    router.get("/", function(req, res){
      res.send("chats");
    });

module.exports = router;
