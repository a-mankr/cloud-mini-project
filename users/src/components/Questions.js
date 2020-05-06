import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import Option from './Option';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  question: {
    padding: theme.spacing(4),
  },
  option: {
    padding: theme.spacing(1),
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} className={classes.question}>
          <Paper className={classes.paper}>
            <Card num={1} statement="Question" />
          </Paper>
        </Grid>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Option num={option} statement="Option" />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
