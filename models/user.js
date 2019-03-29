var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//////////////////////////////
// database schema for user //
//////////////////////////////
var UserSchema = new mongoose.Schema({
    username: String,
    passport: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);