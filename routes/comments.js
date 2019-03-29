///////////////////////////
// variable declarations //
///////////////////////////
var express     = require("express");
var router      = express.Router({mergeParams: true});
var Entry       = require("../models/entry");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

////////////////////
// comment routes //
////////////////////

// new route
router.get("/new", middleware.isLoggedIn, function(req, res){
    Entry.findById(req.params.id, function(err, entry) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {entry: entry});
        }
    });
});

// create route
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup entry using id
    Entry.findById(req.params.id, function(err, entry) {
        if (err) {
            console.log(err);
            res.redirect("/entries");
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "comment not found!");
                    console.log(err);
                }
                else {
                    // save author information to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // save comment information to entry
                    entry.comments.push(comment);
                    entry.save();
                    req.flash("success", "successfully added comment!");
                    res.redirect("/entries/" + entry._id);
                }
            });
        }
    });
});

// edit route
router.get("/:comment_id/edit/", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {entry_id: req.params.id, comment: foundComment});
        }
    });
});

// update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err) {
           res.redirect("back");
       }
       else {
           res.redirect("/entries/" + req.params.id);
       }
   }); 
});

// delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }
        else {
            req.flash("success", "comment deleted");
            res.redirect("/entries/" + req.params.id);
        }
    });
});

module.exports = router;