import React from 'react';
import './App.css';
import { ROUTES } from '../routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StatsPage } from '../components/statsPage'
import { Comment } from '../components/comment'
import { Dashboard } from "../components/dashboard"
import { LoginPage } from "./loginPage"

function App() {
  return (
    <>
      <Router>
        <Switch>
          {ROUTES.map((route, index) => <Route key={index} {...route} />)}
          <Route exact path="/" component={LoginPage}/> 
          <Route exact path="/dashboard/:username" component={Dashboard} />
          <Route exact path="/dashboard/:username/stats" component={StatsPage} />
          <Route exact path="/dashboard/:username/comment" component={Comment} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

//{ROUTES.map((route, index) => <Route key={index} {...route} />)}
