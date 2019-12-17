import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import * as pages from '../../pages';
import './style.scss';

export default () => (
  <div className="app">
    <Switch>
      <Route
        exact
        path="/posts"
        component={pages.PostsPage}
      />
      <Route
        exact
        path="/posts/:id"
        component={pages.PostPage}
      />
      <Redirect to="/posts" />
    </Switch>
  </div>
);
