import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import Option from './Option';
import auth from '../auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  question: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Questions() {
  const classes = useStyles();
  const authToken = auth.getToken();
  const [currentQuestion, setCurrentQuestion] = useState({ isDone: true, qno: 0, question: 'Question', options: [] });

  const qno = 1;
  useEffect(() => {
    async function fetchCurrentQuestion() {
      const res = await fetch(`http://localhost:3001/api/question/${qno}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      switch (res.status) {
        case 200:
          const result = await res.json();
          const { isDone, qno, question, options } = result.data;
          setCurrentQuestion({ isDone, qno, question, options });
          break;
        default:
          console.log(await res.json());
          break;
      }
    }
    fetchCurrentQuestion();
  }, [authToken, qno]);
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center" className={classes.question}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Card num={currentQuestion.qno} statement={currentQuestion.question} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={1} justify="space-evenly">
        {currentQuestion.options.map((option) => (
          <Grid item xs={6} key={option._id}>
            <Paper className={classes.paper}>
              <Option num={option.id} statement={option.option} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
