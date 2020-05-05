import React, { useState, useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import gridStyles from './gridStyles';
import CurrentQuestionContext from './CurrentQuestionContext';

export default function QuestionSelector() {
  const classes = gridStyles();

  const [currentQuestion] = useContext(CurrentQuestionContext);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/fetch/question/${currentQuestion.qNo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const statement = data.question && data.question.question && data.question.question.statement;
          setSelectedQuestion(statement);
        }
      })
      .catch(console.log);
  }, [currentQuestion.qNo]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        Selected question will be displayed here i.e. <br />
        Question no.: {currentQuestion.qNo} <br />
        <h1>{selectedQuestion}</h1>
      </Paper>
    </div>
  );
}
