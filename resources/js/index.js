import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import loadable from '@loadable/component';
/*import Header from './components/Header';
import Products from './components/Products';
import ProductAdd from './components/ProductAdd';
import Category from './components/Category';
import Attribute from './components/Attribute';*/

const Header = loadable(() => import('./components/Header'))
const Products = loadable(() => import('./components/Products'))
const ProductAdd = loadable(() => import('./components/ProductAdd'))
const Category = loadable(() => import('./components/Category'))
const Attribute = loadable(() => import('./components/Attribute'))

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
}

ReactDOM.render(
    (<Router>
        <Header />
        <Switch>
            <Route path="/" exact component={withRouter(Products)} />
            <Route path="/apply" exact component={withRouter(ProductAdd)} />
            <Route path="/addCategory" exact component={withRouter(Category)} />
            <Route path="/addAtribute" exact component={withRouter(Attribute)} />
        </Switch>
    </Router>)
  , document.getElementById('root'));
