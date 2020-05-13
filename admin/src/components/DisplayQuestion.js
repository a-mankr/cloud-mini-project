import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import gridStyles from './gridStyles';
import CurrentQuestionContext from './CurrentQuestionContext';

export default function QuestionSelector() {
  const classes = gridStyles();
  const [currentQuestion] = useContext(CurrentQuestionContext);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        Selected question will be displayed here i.e. <br />
        Question no.: {currentQuestion.qno} <br />
        {!currentQuestion.isDone ? <h1>{currentQuestion.question}</h1> : ''}
      </Paper>
    </div>
  );
}
