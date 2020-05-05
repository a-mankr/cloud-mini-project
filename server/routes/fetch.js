let express = require('express');
let middleware = require('../auth/middleware');
let router = express.Router();

router.get('/questions', middleware.checkToken, (req, res, next) => {
  Questions.find({})
    .sort({ qno: 1 })
    .then((result) => {
      const questions = result.map((question) => {
        return { isDone: question.isDone, qNo: question.qno };
      });
      res.json({ questions: questions, success: true });
    })
    .catch((error) => res.json({ success: false, error: error }));
});

router.get('/variables', (req, res) => {
  Variables.find({ identifier: 'correct' })
    .then((values) => res.json({ success: true, variables: values }))
    .catch((error) => res.json({ success: false, error: error }));
});

router.get('/question/:qno', middleware.checkToken, (req, res, next) => {
  Questions.findOne({ qno: req.params.qno })
    .then((question) => res.json({ question: question, success: true }))
    .catch((error) => res.json({ success: false, error: error }));
});

router.get('/votes', (req, res, next) => {
  Votes.find({}, (err, votes) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ votes: votes, success: true });
    }
  });
});

router.get('/participants', (req, res, next) => {
  Participants.find({}, (err, participants) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ participants: participants, success: true });
    }
  });
});

router.get('/scores', (req, res, next) => {
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
    res.redirect('/participants/login');
  }
}

module.exports = router;
