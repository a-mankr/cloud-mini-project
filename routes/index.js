// for getting data
var express = require("express");
var router = express.Router();

router.get("/", loggedIn, (req, res) => {
  if (req.user.username === "admin") {
    Participants.find({}, (err, participants) => {
      if (err) throw err;
      else {
        res.render("admin", {
          participant: req.user.username,
          title: "Bluff Admin",
          participants: participants
        });
      }
    });
  } else {
    Variables.find({ identifier: "correct" }, (err, values) => {
      if (err || values[0].currentQuestion === 0) {
        res.render("question", {
          participant: req.user.username,
          question: null,
          title: "Bluffmaster",
          isBluff: req.user.isBluff,
          isRemoved: req.user.isRemoved
        });
      } else {
        Questions.find({ qno: values[0].currentQuestion }, (err, question) => {
          if (err) {
            res.render("question", {
              participant: req.user.username,
              question: null,
              title: "Bluffmaster",
              isBluff: req.user.isBluff,
              isRemoved: req.user.isRemoved
            });
          } else {
            if (!req.user.isBluff) shuffle(question[0].question.correctoptions);
            console.log(question);
            res.render("question", {
              participant: req.user.username,
              question: question,
              title: "Bluffmaster",
              isBluff: req.user.isBluff,
              isRemoved: req.user.isRemoved
            });
          }
        });
      }
    });
  }
});

router.get("/scoreupdate", (req, res) => {
  res.render("scoreupdate");
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

router.post("/vote/opponent/:p_id", (req, res) => {
  // console.log("You voted for opponent " + req.params.p_id);
  Votes.update(
    { team: req.user.username },
    { $set: { votedFor: req.params.p_id } },
    { upsert: true },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
  console.log(req.user.username + " voted for opponent " + req.params.p_id);
});

router.get("/question/:qno", (req, res) => {
  res.render("question", {
    qno: req.params.qno,
    title: "Q-" + req.params.qno
  });
});

router.get("/reset", (req, res) => {
  res.render("reset");
});
router.get("/form", (req, res) => {
  res.render("form");
});

router.get("/form2", (req, res) => {
  res.render("form2");
});
router.get("/scoreboard", (req, res) => {
  Score.find({ over: true }, (err, scores) => {
    if (err) {
      res.send({ error: "could not find score" });
    } else {
      let totals = [0, 0, 0, 0, 0, 0];
      for (let i = 0; i < scores.length; i++) {
        totals[0] += scores[i].teama;
        totals[1] += scores[i].teamb;
        totals[2] += scores[i].teamc;
        totals[3] += scores[i].teamd;
        totals[4] += scores[i].teame;
        totals[5] += scores[i].teamf;
      }

      res.render("scoreboard", {
        scores: scores,
        totals: totals
      });
      // res.send({ scores: scores });
    }
  });
});
router.get("/thankyou", (req, res) => {
  res.render("thankyou");
});

// middleware to check if user is logged in
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/participants/login");
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
