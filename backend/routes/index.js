var express = require("express");

var router = express.Router();

router.get("/", loggedIn, (req, res) => {
  res.render("question", {
    title: "Bluffmaster",
  });
});

router.get("/audience", isAudience, (req, res) => {
  res.render("audience", {
    participant: req.user.username,
    title: "Audience view",
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
          scores[i].team6,
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
        totals: totals,
      });
    }
  });
});

router.get("/participant", (req, res) => {
  res.json({ participant: req.user });
});

// router.get("/question/:qno", (req, res) => {
//   res.render("question", {
//     qno: req.params.qno,
//     title: "Q-" + req.params.qno,
//   });
// });

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
module.exports = router;
