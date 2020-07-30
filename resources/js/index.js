import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import loadable from '@loadable/component';
import HeaderComponent from './components/Header';
import ProductsComponent from './components/Products';
import ProductAddComponent from './components/ProductAdd';
import CategoryComponent from './components/Category';
import AttributeComponent from './components/Attribute';
import UserGroupComponent from './components/UserGroup';
import './i18next';
/*const Header = loadable(() => import('./components/Header'))
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
*/

ReactDOM.render(
    (<Router>
        <Suspense fallback="loading">
          <HeaderComponent />
          <Switch>
              <Route path="/" exact component={withRouter(ProductsComponent)} />
              <Route path="/apply" exact component={withRouter(ProductAddComponent)} />
              <Route path="/addCategory" exact component={withRouter(CategoryComponent)} />
              <Route path="/addAtribute" exact component={withRouter(AttributeComponent)} />
              <Route path="/addUserGroup" exact component={withRouter(UserGroupComponent)} />
          </Switch>
        </Suspense>
    </Router>)
  , document.getElementById('root'));
