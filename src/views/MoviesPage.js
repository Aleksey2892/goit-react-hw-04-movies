import React, { Component } from 'react';

import getQueryString from '../utils/getQueryString';
import filmsApi from '../services/filmsApi';
import updateMoviesImg from '../utils/updateMoviesImg';
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

    this.fetchPopular();
    this.setState({ showPopular: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryString(prevProps.location.search);
    const { query: nextQuery } = getQueryString(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.handleSubmitQuery(nextQuery);
    }
  }

  fetchPopular = async () => {
    this.setState({ loader: true });

    try {
      const popular = await filmsApi.defaultFetchPopular();

      this.setState({ films: updateMoviesImg(popular), loader: false });
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmitQuery = async query => {
    this.setState({ loader: true });

    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });

    try {
      const { results } = await filmsApi.fetchWithQuery(query);

      this.setState({
        showPopular: false,
        films: updateMoviesImg(results),
        loader: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { films, showPopular, loader } = this.state;
    const isShowFilms = films.length > 0;
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
