let express = require("express");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let passport = require("passport");
let localStrategy = require("passport-local").Strategy;
let multer = require("multer");
let upload = multer({ dest: "./uploads" });
let flash = require("express-flash");
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");

let app = express();

let indexRouter = require("./routes/index");
let adminRouter = require("./routes/admin");
let feedRouter = require("./routes/feed");
let fetchRouter = require("./routes/fetch");
let participantsRouter = require("./routes/participants");

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// database connection
let initDb = require("./config/init").initDb;
initDb();

// Handle sessions
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Validator
// middleware to be written here

// flash
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/feed", feedRouter);
app.use("/fetch", fetchRouter);
app.use("/participants", participantsRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("live at 3000");
});
