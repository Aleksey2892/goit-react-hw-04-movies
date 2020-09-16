import React, { Component } from 'react';

import s from './styles.module.scss';

const RESET_STATE = {
  inputValue: '',
};

export default class SearchForm extends Component {
  state = { inputValue: '' };

  handleChange = ({ target }) => {
    this.setState({ inputValue: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;

    this.props.onSubmit(inputValue);
    this.setState(RESET_STATE);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
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
          <button className={s.btnSearch}>Search</button>
        </label>
      </form>
    );
  }
}
