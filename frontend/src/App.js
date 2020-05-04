import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

import Navbar from './components/Navbar';
import Admin from './components/Admin';
import Questions from './components/Questions';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Admin} />
        <Route exact path="/audience" component={Questions} />
      </Switch>
    </div>
  );
}

export default App;
