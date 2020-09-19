import React, { Component, lazy, Suspense } from 'react';
import { Route, NavLink } from 'react-router-dom';

import routes from '../routes';
import filmsApi from '../services/filmsApi';
import { updateDetails } from '../utils/updateValues';
// import noImg from '../assets/img/no-image.jpg';
import Loader from '../components/Loader/Loader';

import Details from '../components/Details/Details';

import s from './styles.module.scss';
import Links from '../components/Links/Links';

const AsyncCast = lazy(() =>
  import('../components/Cast/Cast' /* webpackChunkName: 'moduleCast' */),
);
const AsyncReviews = lazy(() =>
  import(
    '../components/Reviews/Reviews' /* webpackChunkName: 'moduleReviews' */
  ),
);

export default class MovieDetailsPage extends Component {
  state = {
    details: null,
  };

  componentDidMount() {
    const { showId } = this.props.match.params;

    this.fetchForDetails(showId);
  }

  checkLocation = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return state.from;
    }

    return '';
  };

  fetchForDetails = async id => {
    const details = await filmsApi.fetchMovieById(id);

    this.setState({ details: updateDetails(details) });
  };

  handleBackBtn = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    this.props.history.push(routes.movies);
  };

  render() {
    const { details } = this.state;
    const isShowDetails = details;

    return (
      <>
        {isShowDetails && (
          <>
            <div className={s.detailsBox}>
              <button
                type="buton"
                onClick={this.handleBackBtn}
                className={s.goBackBtn}
              >
                Go back
              </button>

              <Details details={details} />
            </div>

            <hr />

            <Links
              url={this.props.match.url}
              onCheckLocation={this.checkLocation}
            />
          </>
        )}

        <hr />

        <Suspense fallback={<Loader />}>
          <Route
            exact
            path={`${routes.movieDetails}${routes.cast}`}
            component={AsyncCast}
          />

          <Route
            exact
            path={`${routes.movieDetails}${routes.reviews}`}
            component={AsyncReviews}
          />
        </Suspense>
      </>
    );
  }
}
