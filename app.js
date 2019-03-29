///////////////////////////
// variable declarations //
///////////////////////////
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Entry       = require("./models/entry"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

var commentRoutes   = require("./routes/comments"),
    entryRoutes     = require("./routes/entries"),
    indexRoutes     = require("./routes/index")
    
//////////////////////////////
// application declarations //
//////////////////////////////
mongoose.connect("mongodb://localhost/stationary", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// populate database
// seedDB();

////////////////////////////
// passport configuration //
////////////////////////////
app.use(require("express-session")({
    secret: "hello secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//////////////////
// route setups //
//////////////////
app.use("/", indexRoutes);
app.use("/entries", entryRoutes);
app.use("/entries/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("connected!");
});