import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import PtiPage from './pages/pti_page.jsx';
import NotFound from './pages/notFound.jsx';

const historyOptions = {
  queryKey : false
};

const routes = (
  <Router history={createHistory(historyOptions)}>
    <Route path='/' component={ App }>
      <IndexRoute component={ PtiPage }/>
      <Route path='pti' component={ PtiPage } />
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);

export default routes;
