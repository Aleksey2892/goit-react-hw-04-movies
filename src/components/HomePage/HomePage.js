import React, { Component } from 'react';

import filmsApi from '../../services/filmsApi';
import routes from '../../routes';
import MoviesPageList from '../MoviesPage/MoviesPageList';

export default class HomePage extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.startFetch();
  }

  startFetch = async () => {
    try {
      const { results } = await filmsApi.defaultFetch();

      this.setState({ films: results });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { films } = this.state;
    const isShowFilms = films.length > 0;

    return (
      <>
        {isShowFilms && <MoviesPageList films={films} match={routes.movies} />}
      </>
    );
  }
}
