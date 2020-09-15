import React, { Component } from 'react';

import filmsApi from '../services/filmsApi';
import routes from '../routes';
import MoviesPageList from '../components/MoviesPageList/MoviesPageList';

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
        {isShowFilms && (
          <>
            <h2>Trending today</h2>
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
