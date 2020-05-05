import React from 'react';
import Paper from '@material-ui/core/Paper';
import gridStyles from './gridStyles';

export default function QuestionSelector() {
  const classes = gridStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        Players will be displayed here
      </Paper>
    </div>
  );
}
