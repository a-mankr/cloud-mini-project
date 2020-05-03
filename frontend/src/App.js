import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './components/Navbar';
import Admin from './components/Admin';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Router>
        <Admin path="/" />
      </Router>
    </div>
  );
}

export default App;
