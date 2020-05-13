import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import gridStyles from './gridStyles';
import CurrentQuestionContext from './CurrentQuestionContext';

export default function QuestionSelector(props) {
  const classes = gridStyles();
  const [currentQuestion] = useContext(CurrentQuestionContext);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        Options for Question no.: {currentQuestion.qno} <br />
        {!currentQuestion.isDone
          ? currentQuestion.options.map((option) => (
              <div key={option.id}>
                {option.id}. {option.option}
              </div>
            ))
          : ''}
      </Paper>
    </div>
  );
}
