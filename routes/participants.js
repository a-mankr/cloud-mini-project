let express = require("express");
let multer = require("multer");
let upload = multer({ dest: "./uploads" });
const { check, validationResult } = require("express-validator");
let passport = require("passport");
let localStrategy = require("passport-local").Strategy;

let router = express.Router();
let Participants = require("../models/Participants");

router.get("/", (req, res) => {
  res.send("respond with a resource");
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post(
  "/register",
  /* 
    error checking (validation) 
    TODO: match password & confirm password
  [
    check("name")
      .not()
      .isEmpty(),
    check("username")
      .not()
      .isEmpty(),
    check("password")
      .not()
      .isEmpty(),
    check("confirmpassword")
      .not()
      .isEmpty()
  ],*/
  upload.single("profileimage"),
  (req, res) => {
    // // Form validation
    // const errors = validationResult(req);
    const { name, username, password, profileimage, p_id } = req.body;
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // } else {
    let newParticipant = new Participants({
      p_id: p_id,
      name: name,
      username: username,
      password: password,
      profileimage: profileimage
    });

    Participants.createParticipant(newParticipant, (err, participant) => {
      if (err) throw err;
      console.log(participant);
    });

    res.redirect("/participants/login");
    // }
  }
);
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/participants/login",
    failureFlash: "Invalid username or password"
  }),
  function(req, res) {
    req.flash("success", "You are now logged in!");
    res.redirect("/");
  }
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Participants.getParticipantById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new localStrategy(function(username, password, done) {
    Participants.getParticipantByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown User" });
      }
      Participants.comparePassword(password, user.password, function(
        err,
        isMatch
      ) {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid Password" });
        }
      });
    });
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are now logged out!");
  res.redirect("/participants/login");
});

function isAdmin(req, res, next) {
  if (req.user && req.user.username === "admin") {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
