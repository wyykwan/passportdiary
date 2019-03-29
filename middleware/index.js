///////////////////////////
// variable declarations //
///////////////////////////
var Entry   = require("../models/entry");
var Comment = require("../models/comment");

var middlewareObj = {};

///////////////////////////////////
// check user-event relationship //
///////////////////////////////////
middlewareObj.checkEntryOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Entry.findById(req.params.id, function(err, foundEntry){
            if(err) {
                req.flash("error", "entry not found!");
                res.redirect("back");
            }
            else {
                if(foundEntry.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("you don't have the right permissions!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "you need to login first!");
        res.redirect("back");
    }
}

/////////////////////////////////////
// check user-comment relationship //
/////////////////////////////////////
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                res.redirect("back");
            }
            else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "you need to login first!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "you need to login first!");
        res.redirect("back");
    }
}

/////////////////////////////
// middleware via passport //
/////////////////////////////
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "please login first!");
    res.redirect("/login");
}

module.exports = middlewareObj;