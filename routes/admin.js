let express = require("express");
let router = express.Router();

router.get("/", isAdmin, (req, res) => {
  Participants.find({}, (err, participants) => {
    if (err) throw err;
    else {
      Questions.find({ isDone: false }, (err, questions) => {
        if (err) throw err;
        let questionsNotDone = questions.map(question => question.qno);
        res.render("admin", {
          participant: req.user.username,
          title: "Bluff Admin",
          participants: participants,
          questionsNotDone: questionsNotDone
        });
      });
    }
  });
});

router.get("/question/form", isAdmin, (req, res) => {
  res.render("question-upload", { title: "Upload questions" });
});

router.get("/scoreupdate/form", isAdmin, (req, res) => {
  Participants.find({ isRemoved: false }, (err, participants) => {
    if (err) throw err;
    else {
      Questions.find({ isDone: false }, (err, questions) => {
        if (err) throw err;
        let questionsNotDone = questions.map(question => question.qno);

        res.render("scoreupdate", {
          title: "Update scores",
          participants: participants,
          questionsNotDone: questionsNotDone
        });
      });
    }
  });
});

function isAdmin(req, res, next) {
  if (req.user && req.user.username === "admin") {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
