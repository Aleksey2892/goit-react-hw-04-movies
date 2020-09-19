import React, { Component } from 'react';

import getQueryString from '../utils/getQueryString';
import filmsApi from '../services/filmsApi';
import { updateMoviesImg } from '../utils/updateValues';
import Loader from '../components/Loader/Loader';

import MoviesPageList from '../components/MoviesPageList/MoviesPageList';
import SearchForm from '../components/SearchForm/SearchForm';

import s from './styles.module.scss';

export default class MoviesPage extends Component {
  state = {
    films: [],
    showPopular: false,
    loader: false,
  };

  componentDidMount() {
    const { query } = getQueryString(this.props.location.search);

    if (query) {
      return this.handleSubmitQuery(query);
    }

    this.loadPageFetch();
    this.setState({ showPopular: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryString(prevProps.location.search);
    const { query: nextQuery } = getQueryString(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.handleSubmitQuery(nextQuery);
    }
  }

  loadPageFetch = async () => {
    this.setState({ loader: true });

    const { results } = await filmsApi.fetchPopularMovies();

    this.setState({ films: updateMoviesImg(results), loader: false });
  };

  handleSubmitQuery = async query => {
    this.setState({ loader: true });

    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });

    const { results } = await filmsApi.fetchWithQuery(query);

    this.setState({
      showPopular: false,
      films: updateMoviesImg(results),
      loader: false,
    });
  };

  render() {
    const { films, showPopular, loader } = this.state;
    const isShowFilms = films;
    const isShowPopular = showPopular;
    const isShowLoader = loader;

    return (
      <>
        <SearchForm onSubmit={this.handleSubmitQuery} />

        {isShowLoader && (
          <div>
            <Loader />
          </div>
        )}

        {isShowFilms && (
          <>
            {isShowPopular && (
              <h2 className={s.titlePopular}>This is popular list</h2>
            )}

            <MoviesPageList
              films={films}
              match={this.props.match.url}
              location={this.props.location}
            />
          </>
        )}
      </>
    );
  }
}
