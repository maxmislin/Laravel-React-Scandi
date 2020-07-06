import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/Header';
import App from './components/App';
import Apply from './components/Apply';
import Category from './components/Category';
import Attribute from './components/Attribute';


ReactDOM.render(
    (<Router>
        <Header />
        <Switch>
            <Route path="/" exact component={withRouter(App)} />
            <Route path="/apply" exact component={withRouter(Apply)} />
            <Route path="/addCategory" exact component={Category} />
            <Route path="/addAtribute" exact component={Attribute} />
        </Switch>
    </Router>)
  , document.getElementById('root'));
