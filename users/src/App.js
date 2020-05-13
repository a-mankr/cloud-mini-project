import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Questions from './components/Questions';
import Login from './components/Login';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/" component={Questions} />
        <Route exact path="/login" component={Login} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default App;
