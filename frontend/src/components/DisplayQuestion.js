import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import gridStyles from './gridStyles';

export default function QuestionSelector(props) {
  const classes = gridStyles();
  const { currentQues } = props;

  const [selectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/fetch/question/${currentQues}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const statement = data.question && data.question.question && data.question.question.statement;
          setSelectedQuestion(statement);
        }
      });
  }, [currentQues]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        Selected question will be displayed here i.e. <br />
        Question no.: {currentQues} <br />
        <h1>{selectedQuestion}</h1>
      </Paper>
    </div>
  );
}
