import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from '../routes';

import HomePage from '../views/HomePage';
import MoviesPage from '../views/MoviesPage';
import MovieDetailsPage from '../views/MovieDetailsPage';
import NotFound from '../views/NotFound';
import Layout from './Layout';

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route component={HomePage} exact path={routes.home} />
        <Route component={MoviesPage} exact path={routes.movies} />
        <Route component={MovieDetailsPage} path={routes.movieDetails} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
