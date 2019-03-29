var mongoose = require("mongoose");

/////////////////////////////////
// database schema for comment //
/////////////////////////////////
var commentSchema = mongoose.Schema({
    text: String, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: "String"
    }
});

module.exports = mongoose.model("Comment", commentSchema)