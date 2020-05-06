import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
}));

export default function OutlinedCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>{props.num}</Typography>
        <Typography variant="h5" component="h5">
          {props.statement}
        </Typography>
      </CardContent>
    </Card>
  );
}
