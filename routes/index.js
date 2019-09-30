var express = require("express");
var router = express.Router();

router.get("/", loggedIn, (req, res) => {
  Variables.find({ identifier: "correct" }, (err, values) => {
    if (err) throw err;
    else if (values[0].currentQuestion === 0) {
      res.render("question", {
        participant: req.user.username,
        question: null,
        title: "Bluffmaster",
        isBluff: req.user.isBluff,
        isRemoved: req.user.isRemoved,
        participants: []
      });
    } else {
      Questions.find({ qno: values[0].currentQuestion }, (err, question) => {
        if (err) throw err;
        else {
          Participants.find({}, (err, participants) => {
            if (err) throw err;
            else {
              if (!req.user.isBluff)
                shuffle(question[0].question.correctoptions);
              console.log(question);
              res.render("question", {
                participant: req.user.username,
                question: question,
                title: "Bluffmaster",
                isBluff: req.user.isBluff,
                isRemoved: req.user.isRemoved,
                participants: participants
              });
            }
          });
        }
      });
    }
  });
});

router.get("/audience", isAudience, (req, res) => {
  res.send("well, for audience!");
});

router.get("/vote", loggedIn, (req, res) => {
  Participants.find(
    { username: { $ne: req.user.username } },
    (err, opponents) => {
      if (err) throw err;
      else {
        // console.log(opponents);
        res.render("vote", { title: "Vote!", opponents: opponents });
      }
    }
  );
});

router.get("/scoreboard", (req, res) => {
  let totals = [0, 0, 0, 0, 0, 0];
  res.render("scoreboard", { title: "Scoreboard", scores: [], totals: totals });
});

router.get("/question/:qno", (req, res) => {
  res.render("question", {
    qno: req.params.qno,
    title: "Q-" + req.params.qno
  });
});

// middleware to check if user is logged in
function loggedIn(req, res, next) {
  if (req.user && req.user.username === "admin") {
    res.redirect("/admin");
  } else if (req.user && req.user.username === "audience") {
    res.redirect("/audience");
  } else if (req.user) {
    next();
  } else {
    res.redirect("/participants/login");
  }
}

function isAudience(req, res, next) {
  if (req.user && req.user.username === "audience") {
    next();
  } else {
    res.redirect("/");
  }
}

// random shuffle array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports = router;
