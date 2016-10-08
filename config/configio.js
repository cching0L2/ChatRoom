var config = function(io){
  io.on("connection", function(socket){
      console.log("A user has entered the lobby");
      socket.on("disconnect", function(){
          console.log("A user has left the lobby");
      });

      socket.on("message", function(data){
          console.log("Message received");
          console.log(data);
          io.emit("new message", data);
      });

      socket.on("enter room", function(){
          console.log("A user has entered the room");
      });

      socket.on("leave room", function(){
          console.log("A user has left the room");
      });
  });
};

module.exports = config;
