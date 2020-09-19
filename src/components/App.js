import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from '../routes';

import Loader from './Loader/Loader';

import Layout from './Layout';
import HomePage from '../views/HomePage';

const AsyncMoviesPage = lazy(() =>
  import('../views/MoviesPage' /* webpackChunkName: 'moduleMoviesPage' */),
);
const AsyncMovieDetailsPage = lazy(() =>
  import(
    '../views/MovieDetailsPage' /* webpackChunkName: 'moduleMovieDetailsPage' */
  ),
);

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route component={HomePage} exact path={routes.home} />
          <Route component={AsyncMoviesPage} exact path={routes.movies} />
          <Route component={AsyncMovieDetailsPage} path={routes.movieDetails} />

          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </Layout>
  );
}
