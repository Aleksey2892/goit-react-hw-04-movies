import React, { Component } from 'react';

import filmsApi from '../../services/filmsApi';
import MoviesPageList from './MoviesPageList';

import s from './styles.module.scss';

const RESET_STATE = {
  inputValue: '',
};

class MoviesPage extends Component {
  state = {
    inputValue: '',
    films: [],
  };

  handleChange = ({ target }) => {
    this.setState({ inputValue: target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { inputValue } = this.state;

    try {
      const { results } = await filmsApi.fetchWithQuery(inputValue);

      this.setState({ films: results });
    } catch (err) {
      console.log(err);
    }

    this.setState(RESET_STATE);
  };

  render() {
    const { films } = this.state;
    const isShowFilms = films.length > 0;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              autoFocus
              type="text"
              autoComplete="off"
              placeholder="Search movie"
              className={s.input}
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
            <button>Search</button>
          </label>
        </form>

        {isShowFilms && (
          <MoviesPageList films={films} match={this.props.match.url} />
        )}
      </>
    );
  }
}

export default MoviesPage;
