import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import routes from '../routes';
import filmsApi from '../services/filmsApi';
import updateDetails from '../utils/updateDetails';
import noImg from '../assets/img/no-image.jpg';

import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';

import s from './styles.module.scss';

export default class MovieDetailsPage extends Component {
  state = {
    details: null,
  };

  componentDidMount() {
    const { showId } = this.props.match.params;
    console.log(this.props.location.state.from);

    this.fetchForDetails(showId);
  }

  fetchForDetails = async id => {
    try {
      const details = await filmsApi.fetchWithId(id);

      this.setState({ details: updateDetails(details) });
    } catch (err) {
      console.log(err);
    }
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
                <h4>User Score: {details.vote_average * 10}%</h4>
                <h3>Overview</h3>
                <p>{details.overview}</p>
                <h4>Genres</h4>
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
            <p>Additional Information</p>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${this.props.match.url}${routes.cast}`,
                    state: { from: this.props.location.state.from },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${this.props.match.url}${routes.reviews}`,
                    state: { from: this.props.location.state.from },
                  }}
                >
                  Review
                </Link>
              </li>
            </ul>
          </>
        )}

        <hr />

        <Route path={`${routes.movieDetails}${routes.cast}`} component={Cast} />

        <Route
          path={`${routes.movieDetails}${routes.reviews}`}
          component={Reviews}
        />

        {/* <Redirect to={routes.home} /> */}
      </>
    );
  }
}
