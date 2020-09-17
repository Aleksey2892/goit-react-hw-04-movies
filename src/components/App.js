import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from '../routes';

import HomePage from '../views/HomePage';
import MoviesPage from '../views/MoviesPage';
import MovieDetailsPage from '../views/MovieDetailsPage';

import Layout from './Layout';

// const AsyncMoviesPage = lazy(
//   import('../views/MoviesPage' /* webpackChunkName: 'moduleMoviesPage' */),
// );
// const AsyncMovieDetailsPage = lazy(
//   import(
//     '../views/MovieDetailsPage' /* webpackChunkName: 'moduleMovieDetailsPage' */
//   ),
// );

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route component={HomePage} exact path={routes.home} />
          <Route component={MoviesPage} exact path={routes.movies} />
          <Route component={MovieDetailsPage} path={routes.movieDetails} />

          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </Layout>
  );
}
