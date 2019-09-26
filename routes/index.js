// for getting data
var express = require("express");
var router = express.Router();

router.get("/", loggedIn, (req, res) => {
  if (req.user.username === "admin") {
    Participants.find({}, (err, participants) => {
      if (err) throw err;
      else {
        res.render("admin", {
          title: "Bluff Admin",
          participants: participants
        });
      }
    });
  } else {
    Variables.find({ identifier: "correct" }, (err, values) => {
      if (err) {
        res.render("question", { question: null, title: "Bluffmaster" });
      } else {
        Questions.find({ qno: values[0].currentQuestion }, (err, question) => {
          if (err) {
            res.render("question", {
              question: null,
              title: "Bluffmaster",
              isBluff: req.user.isBluff
            });
          } else {
            res.render("question", {
              question: question,
              title: "Bluffmaster",
              isBluff: req.user.isBluff
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

router.get("/vote", (req, res) => {
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
  res.send("You voted for opponent " + req.params.p_id);
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

module.exports = router;
