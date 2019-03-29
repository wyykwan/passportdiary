///////////////////////////
// variable declarations //
///////////////////////////
var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

/////////////////
// main route //
/////////////////
router.get("/", function(req, res) {
    res.render("landing");
});

///////////////////////////
// authentication routes //
///////////////////////////
// show registration form
router.get("/register", function(req, res) {
    res.render("register");
});

// sign up logic
router.post("/register", function(req, res){
    // retrieve user details from form
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "welcome, " + user.username);
            res.redirect("/entries");
        });
    });
});

// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

////////////////////
// general routes //
////////////////////

// login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/entries",
        failureRedirect: "/login"
    }), 
    function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "logged you out");
    res.redirect("/entries");
});


module.exports = router;