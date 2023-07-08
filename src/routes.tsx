import React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Home from './screens/Home';
import Login from './screens/Login';

export default function Routes() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/auth">
        <Login />
      </Route>
    </Router>
  );
}