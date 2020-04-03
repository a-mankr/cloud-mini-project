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
      Questions.find({}, (err, questions) => {
        if (err) throw err;
        let questionNos = questions.map(question => question.qno);
        res.render("scoreupdate", {
          title: "Update scores",
          participants: participants,
          questionNos: questionNos
        });
      });
    }
  });
});

router.post("/voting/enable", isAdmin, (req, res) => {
  Variables.update(
    { identifier: "correct" },
    {
      $set: { letVotingHappen: true }
    },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
});

router.post("/voting/disable", isAdmin, (req, res) => {
  Variables.update(
    { identifier: "correct" },
    {
      $set: { letVotingHappen: false }
    },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
});

function isAdmin(req, res, next) {
  if (req.user && req.user.username === "admin") {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
