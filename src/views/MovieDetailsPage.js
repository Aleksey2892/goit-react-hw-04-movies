import React, { Component, lazy, Suspense } from 'react';
import { Route, NavLink } from 'react-router-dom';

import routes from '../routes';
import filmsApi from '../services/filmsApi';
import { updateDetails } from '../utils/updateValues';
import noImg from '../assets/img/no-image.jpg';
import Loader from '../components/Loader/Loader';

import s from './styles.module.scss';

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
    const details = await filmsApi.fetchMoviesById(id);

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
              <div>
                <button
                  type="buton"
                  onClick={this.handleBackBtn}
                  className={s.goBackBtn}
                >
                  Go back
                </button>
                <img
                  src={details.poster_path ? details.poster_path : noImg}
                  alt={details.original_title}
                />
              </div>

              <div className={s.aboutFilmBox}>
                <h3>
                  {details.original_title} ({details.release_date})
                </h3>
                <h3>User Score: {details.vote_average * 10}%</h3>
                <h3>Overview</h3>
                <p>{details.overview}</p>
                <h3>Genres</h3>
                <p>
                  {details.genres &&
                    details.genres.map(genre => (
                      <span key={genre.id}>{genre.name} </span>
                    ))}

                  {!details.genres && <span>No genres</span>}
                </p>
              </div>
            </div>

            <hr />
            <p className={s.infoTitle}>Additional Information</p>
            <ul className={s.addInfo}>
              <li className={s.info}>
                <NavLink
                  className={s.infoLink}
                  activeClassName={s.infoLinkActive}
                  to={{
                    pathname: `${this.props.match.url}${routes.cast}`,
                    state: { from: this.checkLocation() },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li className={s.info}>
                <NavLink
                  className={s.infoLink}
                  activeClassName={s.infoLinkActive}
                  to={{
                    pathname: `${this.props.match.url}${routes.reviews}`,
                    state: { from: this.checkLocation() },
                  }}
                >
                  Review
                </NavLink>
              </li>
            </ul>
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
