// for getting data
var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/scoreupdate", (req, res) => {
  res.render("scoreupdate");
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

module.exports = router;
