import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChooseBluffmaster from './ChooseBluffmaster';
import Voting from './Voting';
import DisplayQuestion from './DisplayQuestion';
import DisplayOptions from './DisplayOptions';
import ActivePlayers from './ActivePlayers';
import QuestionSelector from './QuestionSelector';
import CurrentQuestionContext from './CurrentQuestionContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    padding: theme.spacing(1),
  },
}));

export default function Admin() {
  const classes = useStyles();
  const currentQues = useState({
    isDone: false,
    qno: 0,
    question: 'This is a question',
    options: [
      { id: 1, option: 'Option 1' },
      { id: 2, option: 'Option 2' },
      { id: 3, option: 'Option 3' },
      { id: 4, option: 'Option 4' },
      { id: 5, option: 'Option 5' },
      { id: 6, option: 'Option 6' },
      { id: 7, option: 'Option 7' },
      { id: 8, option: 'Option 8' },
      { id: 9, option: 'Option 9' },
      { id: 10, option: 'Option 10' },
    ],
  });
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <CurrentQuestionContext.Provider value={currentQues}>
          <Grid item xs={4} className={classes.grid}>
            <QuestionSelector />
          </Grid>
          <Grid item xs={4} className={classes.grid}>
            <DisplayQuestion />
          </Grid>
          <Grid item xs={4} className={classes.grid}>
            <DisplayOptions />
          </Grid>
        </CurrentQuestionContext.Provider>
        <Grid item xs={4} className={classes.grid}>
          <ChooseBluffmaster />
        </Grid>
        <Grid item xs={4} className={classes.grid}>
          <ActivePlayers />
        </Grid>
        <Grid item xs={4} className={classes.grid}>
          <Voting />
        </Grid>
      </Grid>
    </div>
  );
}
