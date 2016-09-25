var express         = require("express"),
    app             = express(),
    router          = express.Router(),
    passport        = require("passport");

var User            = require("../model/UserModel");

    router.get("/register", function(req, res){
        res.render("auth/register");
    });

    router.post("/register",
        function(req, res, next){
            console.log(req.body);
            next();
        }, passport.authenticate("local-register", {
            successRedirect: "/",
            failureRedirect: "register"
        })
    );

    router.get("/login", function(req, res){
        res.render("auth/login");
    });

    router.post("/login",
        function(req, res, next){
            console.log(req);
            console.log("POST login hit");
            next();
        }, passport.authenticate("local-login", {
            successRedirect: "/",
            failureRedirect: "login"
        })
    );

    router.post("/logout", function(req, res){
        req.logout();
        res.redirect("/");
    });

module.exports = router;
