let express = require("express");
let router = express.Router();

router.get("/questions", loggedIn, (req, res, next) => {
  Questions.find({})
    .then((questions) => res.json({ questions: questions, success: true }))
    .catch((error) => res.json({ success: false, error: error }));
});

router.get("/variables", loggedIn, (req, res) => {
  Variables.find({ identifier: "correct" })
    .then((values) => res.json({ success: true, variables: values }))
    .catch((error) => res.json({ success: false, error: error }));
});

router.get("/question/:qno", loggedIn, (req, res, next) => {
  Questions.find({ qno: req.params.qno })
    .then((question) => res.json({ question: question, success: true }))
    .catch((error) => res.json({ success: false, error: error }));
});

router.get("/votes", loggedIn, (req, res, next) => {
  Votes.find({}, (err, votes) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ votes: votes, success: true });
    }
  });
});

router.get("/participants", loggedIn, (req, res, next) => {
  Participants.find({}, (err, participants) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ participants: participants, success: true });
    }
  });
});

router.get("/scores", loggedIn, (req, res, next) => {
  Scores.find({}, (err, scores) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ scores: scores, success: true });
    }
  });
});

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/participants/login");
  }
}

module.exports = router;
