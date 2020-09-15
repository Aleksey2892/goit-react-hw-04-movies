import React, { Component } from 'react';

import getQueryString from '../utils/getQueryString';

import filmsApi from '../services/filmsApi';
import MoviesPageList from '../components/MoviesPageList/MoviesPageList';
import SearchForm from '../components/SearchForm/SearchForm';

export default class MoviesPage extends Component {
  state = {
    films: [],
    showPopular: false,
  };

  componentDidMount() {
    const { query } = getQueryString(this.props.location.search);
    console.log(query);

    if (query) {
      console.log('есть');
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
    try {
      const popular = await filmsApi.defaultFetchPopular();
      console.log(popular);
      this.setState({ films: popular });
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmitQuery = async query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });

    try {
      const { results } = await filmsApi.fetchWithQuery(query);

      this.setState({ showPopular: false, films: results });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { films, showPopular } = this.state;
    const isShowFilms = films.length > 0;
    const isShowPopular = showPopular;

    return (
      <>
        <SearchForm onSubmit={this.handleSubmitQuery} />

        {isShowFilms && (
          <>
            {isShowPopular && <h2>This is popular list</h2>}
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
