import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from '../routes';

import NavMenu from './NavMenu/NavMenu';
import HomePage from './HomePage/HomePage';
import MoviesPage from './MoviesPage/MoviesPage';
import MovieDetailsPage from './MovieDetailsPage/MovieDetailsPage';
import NotFound from './NotFound/NotFound';

export default class App extends Component {
  // state = {
  //   films: [],
  // };

  // componentDidMount() {
  //   this.startFetch();
  // }

  // startFetch = async () => {
  //   try {
  //     const { results } = await filmsApi.defaultFetch();

  //     this.setState({ films: results });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  render() {
    // const { films } = this.state;
    // const isShowFilms = films.length > 0;

    return (
      <>
        <NavMenu />

        <Switch>
          <Route component={HomePage} exact path={routes.home} />
          <Route component={MoviesPage} exact path={routes.movies} />
          <Route component={MovieDetailsPage} path={routes.movieDetails} />

          <Route component={NotFound} />
        </Switch>
      </>
    );
  }
}
