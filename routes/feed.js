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
    correctoption10,
    incorrectoption1,
    incorrectoption2,
    incorrectoption3,
    incorrectoption4,
    incorrectoption5,
    incorrectoption6,
    incorrectoption7,
    incorrectoption8,
    incorrectoption9,
    incorrectoption10
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
  const incorrectoptions = [
    { optionNo: 1, option: incorrectoption1 },
    { optionNo: 2, option: incorrectoption2 },
    { optionNo: 3, option: incorrectoption3 },
    { optionNo: 4, option: incorrectoption4 },
    { optionNo: 5, option: incorrectoption5 },
    { optionNo: 6, option: incorrectoption6 },
    { optionNo: 7, option: incorrectoption7 },
    { optionNo: 8, option: incorrectoption8 },
    { optionNo: 9, option: incorrectoption9 },
    { optionNo: 10, option: incorrectoption10 }
  ];

  let ques = new Questions({
    qno: qno,
    question: {
      statement: question,
      correctoptions: correctoptions,
      incorrectoptions: incorrectoptions
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
module.exports = router;
