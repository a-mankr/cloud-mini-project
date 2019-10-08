var express = require("express");
var fetch = require("node-fetch");
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
        letVotingHappen: values[0].letVotingHappen,
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
              res.render("question", {
                participant: req.user.username,
                question: question,
                title: "Bluffmaster",
                isBluff: req.user.isBluff,
                letVotingHappen: values[0].letVotingHappen,
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
  Variables.find({ identifier: "correct" }, (err, values) => {
    if (err) throw err;
    else if (values[0].currentQuestion === 0) {
      res.render("audience", {
        participant: req.user.username,
        question: null,
        title: "Bluffmaster"
      });
    } else {
      Questions.find({ qno: values[0].currentQuestion }, (err, question) => {
        if (err) throw err;
        else {
          res.render("audience", {
            participant: req.user.username,
            question: question,
            title: "Audience view"
          });
        }
      });
    }
  });
});

router.get("/vote", loggedIn, (req, res) => {
  Participants.find(
    { username: { $ne: req.user.username } },
    (err, opponents) => {
      if (err) throw err;
      else {
        res.render("vote", { title: "Vote!", opponents: opponents });
      }
    }
  );
});

router.get("/scoreboard", (req, res) => {
  Scores.find({}, (err, scores) => {
    if (err) throw err;
    else {
      let totals = [0, 0, 0, 0, 0, 0];
      let allScores = new Array(scores.length);
      let questionNos = new Array(scores.length);
      for (let i = 0; i < allScores.length; i++) {
        allScores[i] = [
          scores[i].team1,
          scores[i].team2,
          scores[i].team3,
          scores[i].team4,
          scores[i].team5,
          scores[i].team6
        ];
        questionNos[i] = scores[i].qno;
      }
      for (let i = 0; i < scores.length; i++) {
        totals[0] += scores[i].team1;
        totals[1] += scores[i].team2;
        totals[2] += scores[i].team3;
        totals[3] += scores[i].team4;
        totals[4] += scores[i].team5;
        totals[5] += scores[i].team6;
      }
      res.render("scoreboard", {
        title: "Scoreboard",
        questionNos: questionNos,
        allScores: allScores,
        scores: scores,
        totals: totals
      });
    }
  });
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
