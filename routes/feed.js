let express = require("express");
let router = express.Router();

router.post("/question", (req, res, next) => {
  const {
    qno,
    question,
    correctoption1,
    correctoption2,
    correctoption3,
    correctoption4,
    correctoption5,
    correctoption6,
    correctoption7,
    correctoption8,
    correctoption9,
    correctoption10
  } = req.body;
  const correctoptions = [
    { optionNo: 1, option: correctoption1 },
    { optionNo: 2, option: correctoption2 },
    { optionNo: 3, option: correctoption3 },
    { optionNo: 4, option: correctoption4 },
    { optionNo: 5, option: correctoption5 },
    { optionNo: 6, option: correctoption6 },
    { optionNo: 7, option: correctoption7 },
    { optionNo: 8, option: correctoption8 },
    { optionNo: 9, option: correctoption9 },
    { optionNo: 10, option: correctoption10 }
  ];

  let ques = new Questions({
    qno: qno,
    question: {
      statement: question,
      correctoptions: correctoptions
    },
    isDone: false
  });
  ques.save(err => {
    if (err) {
      console.log("couldn't save!");
    } else {
      console.log("saved successfully...");
    }
    res.send(req.body);
  });
});

router.post("/setcurrentquestion/:qno", (req, res, next) => {
  Variables.update(
    { identifier: "correct" },
    {
      $set: { currentQuestion: req.params.qno === "none" ? 0 : req.params.qno }
    },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
});

// sets the isDone flag for a question to true
router.post("/markquesasdone/:qno", (req, res, next) => {
  Questions.update(
    { qno: req.params.qno },
    { $set: { isDone: true } },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
});

// sets isDone flag for all questions to false (i.e. to its default value)
router.post("/resetquesdone", (req, res, next) => {
  Questions.update(
    {},
    { $set: { isDone: false } },
    { multi: true },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
});

router.post("/selectbluffmaster/:p_id", (req, res, next) => {
  Variables.update(
    { identifier: "correct" },
    { $set: { bluffTeam: req.params.p_id } },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
  Participants.update(
    { p_id: req.params.p_id },
    { $set: { isBluff: true } },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
});
router.post("/resetbluffmaster", (req, res, next) => {
  Participants.update(
    {},
    { $set: { isBluff: false } },
    { multi: true },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
});

router.post("/removeteam/:team", (req, res, next) => {
  Participants.update(
    { username: req.params.team },
    { $set: { isRemoved: true } },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
});

router.post("/undoremove", (req, res, next) => {
  Participants.update(
    {},
    { $set: { isRemoved: false } },
    { multi: true },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
});

router.post("/resetvotes", (req, res, next) => {
  Votes.update({}, { $set: { votedFor: 0 } }, { multi: true }, (err, doc) => {
    if (err) throw err;
    console.log(doc);
  });
});

router.post("/score", (req, res, next) => {
  let { question, team1, team2, team3, team4, team5, team6 } = req.body;
  Scores.update(
    { qno: question },
    {
      $set: {
        team1: team1,
        team2: team2,
        team3: team3,
        team4: team4,
        team5: team5,
        team6: team6
      }
    },
    { upsert: true },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
  res.redirect("/scoreboard");
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

module.exports = router;
