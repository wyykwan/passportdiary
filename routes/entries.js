///////////////////////////
// variable declarations //
///////////////////////////
var express     = require("express");
var router      = express.Router();
var Entry       = require("../models/entry");
var middleware  = require("../middleware");

//////////////////
// entry routes //
//////////////////

// index route
router.get("/", function(req, res) {
    Entry.find({}, function(err, allEntries){
        if(err){
            console.log(err);
        }
        else {
            res.render("entries/index", {entries: allEntries});
        }
    });
});

// add route
router.post("/", middleware.isLoggedIn, function(req, res) {
   // get data from form and add to array + redirect back to entries page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newEntry = {name: name, image: image, description: desc, author: author};
    // create new entry and save to db
    Entry.create(newEntry, function(err, newlyCreated){
        if (err){
            console.log(err);
        }
        else {
            res.redirect("/entries");
        }
    });
});

// new route
router.get("/new", middleware.isLoggedIn, function(req,res) {
    res.render("entries/new");
});

// show route
router.get("/:id", function(req, res) {
    Entry.findById(req.params.id).populate("comments").exec(function(err, foundEntry) {
       if(err){
           console.log(err);
       } 
       else {
           console.log(foundEntry);
           // render show template with that entry
           res.render("entries/show", {entry: foundEntry});
       }
    });
});

// edit route
router.get("/:id/edit", middleware.checkEntryOwnership, function(req, res){
    Entry.findById(req.params.id, function(err, foundEntry){
        if (err) {
            req.flash("error", "entry not found!");
        }
        res.render("entries/edit", {entry: foundEntry});
    });
});

// update route
router.put("/:id", middleware.checkEntryOwnership, function(req, res){
    // find and update entry
    Entry.findByIdAndUpdate(req.param.id, req.body.entry, function(err, updatedEntry){
        if(err) {
            res.redirect("/entries");
        }
        else {
            res.redirect("/entries/" + req.params.id);
        }
    });
})

// delete route
router.delete("/:id", middleware.checkEntryOwnership, function(req, res) {
    Entry.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/entries");
        }
        else {
            res.redirect("/entries");
        }
    });
});


module.exports = router;