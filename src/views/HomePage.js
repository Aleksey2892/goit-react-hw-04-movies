import React, { Component } from 'react';

import filmsApi from '../services/filmsApi';
import routes from '../routes';
import { updateMoviesImg } from '../utils/updateValues';
import Loader from '../components/Loader/Loader';

import MoviesPageList from '../components/MoviesPageList/MoviesPageList';

import s from './styles.module.scss';

export default class HomePage extends Component {
  state = {
    films: [],
    loader: false,
  };

  componentDidMount() {
    this.getTrendingMovies();
  }

  getTrendingMovies = async () => {
    this.setState({ loader: true });

    const { results } = await filmsApi.fetchTrendingMovies();

    this.setState({ films: updateMoviesImg(results), loader: false });
  };

  render() {
    const { films, loader } = this.state;
    const isShowFilms = films;
    const isShowLoader = loader;

    return (
      <>
        {isShowLoader && <Loader />}

        {isShowFilms && (
          <>
            <h2 className={s.titlePopular}>Trending today</h2>
            <MoviesPageList
              films={films}
              match={routes.movies}
              location={this.props.location}
            />
          </>
        )}
      </>
    );
  }
}
