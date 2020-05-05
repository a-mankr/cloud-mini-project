import React, { useState, useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import gridStyles from './gridStyles';
import CurrentQuestionContext from './CurrentQuestionContext';
import auth from '../auth';

export default function QuestionSelector() {
  const classes = gridStyles();

  const [currentQuestion] = useContext(CurrentQuestionContext);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const authToken = auth.getToken();

  useEffect(() => {
    fetch(`http://localhost:3001/fetch/question/${currentQuestion.qNo}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          const statement = data.question && data.question.question && data.question.question.statement;
          setSelectedQuestion(statement);
        }
      })
      .catch(console.log);
  }, [currentQuestion.qNo, authToken]);

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
