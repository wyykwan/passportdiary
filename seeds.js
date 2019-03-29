///////////////////////////
// variable declarations //
///////////////////////////
var moongoose = require("mongoose");
var Entry = require("./models/entry");
var Comment = require("./models/comment");

var data = [
    {
        name: "tokyo", 
        image: "https://cdn2.iconfinder.com/data/icons/landmarks-ii-color/200/10-128.png",
        description: "Transportation: $xx.xx... etc"
        
    },
    {
        name: "beijing", 
        image: "https://cdn2.iconfinder.com/data/icons/landmarks-ii-color/200/23-128.png",
        description: "Transportation: $xx.xx... etc"
    },
    {
        name: "taipei", 
        image: "https://cdn2.iconfinder.com/data/icons/landmarks-ii-color/200/08-128.png",
        description: "Transportation: $xx.xx... etc"
    },
    {
        name: "san francisco", 
        image: "https://cdn2.iconfinder.com/data/icons/landmarks-ii-color/200/19-128.png",
        description: "Transportation: $xx.xx... etc"
    },
    {
        name: "singapore", 
        image: "https://cdn2.iconfinder.com/data/icons/landmarks-ii-color/200/12-128.png",
        description: "Transportation: $xx.xx... etc"
        
    },
    {
        name: "rome", 
        image: "https://cdn2.iconfinder.com/data/icons/landmarks-ii-color/200/02-128.png",
        description: "Transportation: $xx.xx... etc"
        
    },
    {
        name: "dubai", 
        image: "https://cdn2.iconfinder.com/data/icons/landmarks-ii-color/200/01-128.png",
        description: "Transportation: $xx.xx... etc"
        
    },
    {
        name: "london", 
        image: "https://cdn2.iconfinder.com/data/icons/landmarks-ii-color/200/17-128.png",
        description: "Transportation: $xx.xx... etc"
        
    }
];
    
function seedDB() {
    // clear database
    Entry.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("removed everything!");
        
        // repopulate database
        data.forEach(function(seed){
            Entry.create(seed, function(err, entry) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("added new entry!");
                    // create comments
                    Comment.create(
                    {
                        text: "test comment!",
                        author: "user"
                    }, 
                    function(err, comment) {
                        entry.comments.push(comment);
                        entry.save();
                        console.log("new comment created!");
                    }); 
                }
            })
        })
    });
};

module.exports = seedDB;