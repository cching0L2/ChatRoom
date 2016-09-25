var passport            = require("passport"),
    LocalStrategy       = require("passport-local").Strategy,
    User                = require("../model/UserModel");

    module.exports = function(passport){
        console.log("passport configrued");
        passport.serializeUser(function(user, done){
            console.log("serializeUser");
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done){
            console.log("deserializeUser");
            User.findById(id, function(err, user){
                done(err, user);
            });
        });

        passport.use("local-register", new LocalStrategy(
            function(username, password, done){
                console.log("local-register strategy hit");
                console.log(done);
                User.findOne({username: username}).then(function(user){
                        console.log(user);
                        if(!user){ // sign user up if user doesn't exist in DB
                            console.log("local-register middleware used: user not in database");
                            var newUser = new User();
                            newUser.username = username;
                            newUser.password = password;

                            newUser.save().then(function(registeredUser){
                                console.log("user registered successfully");
                                console.log(registeredUser);
                                return done(null, registeredUser);
                            }).catch(function(err){
                                throw err;
                            });
                        } else {
                            console.log("local-register middleware used: username taken");
                            return done(null, false, {message: "Username already taken"});
                        }
                    }).catch(function(err){
                        return done(err);
                    });
            }
        ));

        passport.use("local-login", new LocalStrategy(
            function(username, password, done){
                console.log("local-login strategy hit");
                User.findOne({username: username}).then(function(user){
                    console.log(user);
                    if(!user){
                        console.log("no such user");
                        return done(null, false, {message: "User does not exist"});
                    } else if (!user.validatePassword(password)){
                        console.log("wrong password");
                        return done(null, false, {message: "Incorrect password"});
                    }

                    return done(null, user);
                }).catch(function(err){
                    return done(err);
                });
            }
        ));
    };
