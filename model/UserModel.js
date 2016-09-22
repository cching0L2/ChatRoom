var mongoose        = require("mongoose"),
    Schema          = mongoose.Schema,
    autoIncrement   = require("mongoose-auto-increment");

var userSchema = new Schema({
    username:       {type: String, required: true},
    alias:          String,
    joinedRooms:    [{type: Number, ref: "Room"}],
    createdAt:      Date
});

userSchema.pre("save", function(next){
    if(this.isNew) {
        this.createdAt= Date.now();
        console.log("A new user is created, date: " + this.createdAt);
    }
    next();
});

userSchema.plugin(autoIncrement.plugin, "User");

module.exports = mongoose.model("User", userSchema);
