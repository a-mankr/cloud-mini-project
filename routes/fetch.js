let express = require("express");
let router = express.Router();

router.get("/questions", (req, res, next) => {
  Questions.find({}, (err, questions) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ questions: questions, success: true });
    }
  });
});

router.get("/question/:qno", (req, res, next) => {
  Questions.find({ qno: req.params.qno }, (err, question) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ question: question, success: true });
    }
  });
});

module.exports = router;
