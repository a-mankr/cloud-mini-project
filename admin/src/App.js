import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import Login from './components/Login';
import Signup from './components/Signup';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/" component={Admin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default App;
