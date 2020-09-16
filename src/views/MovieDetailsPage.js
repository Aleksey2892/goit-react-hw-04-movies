import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import routes from '../routes';
import filmsApi from '../services/filmsApi';

import noImg from '../utils/no-image.jpg';

import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews';

import s from './styles.module.scss';

export default class MovieDetailsPage extends Component {
  state = {
    details: null,
    cast: null,
    review: null,
  };

  componentDidMount() {
    const { showId } = this.props.match.params;

    this.fetchForDetails(showId);
  }

  fetchForDetails = async id => {
    try {
      const details = await filmsApi.fetchWithId(id);

      const updateDetails = details => {
        if (details.poster_path) {
          const defUrl = 'https://image.tmdb.org/t/p/w200';
          details.poster_path = defUrl + details.poster_path;
        }

        if (details.release_date) {
          details.release_date = details.release_date.slice(0, 4);
        }

        return details;
      };

      this.setState({ details: updateDetails(details) });
    } catch (err) {
      console.log(err);
    }
  };

  handleCastClick = async () => {
    const { id } = this.state.details;

    try {
      const { cast } = await filmsApi.fetchCastWithId(id);
      console.log(cast);

      const updateCastImg = cast => {
        const defUrl = 'https://image.tmdb.org/t/p/w200';

        const updateImgUrl = cast.map(item => {
          if (item.profile_path) {
            item.profile_path = defUrl + item.profile_path;
          }
          return item;
        });
        return updateImgUrl;
      };

      this.setState({ cast: updateCastImg(cast) });
    } catch (err) {
      console.log(err);
    }
  };

  handleReviewClick = async () => {
    const { id } = this.state.details;

    try {
      const { results } = await filmsApi.fetchReviewWithId(id);

      this.setState({ review: results });
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
    const { details, cast, review, imgUrl } = this.state;
    const isShowDetails = details;
    const isShowCast = cast;
    const isShowReview = review;

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
                  Go back to the movies
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
                  onClick={this.handleCastClick}
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
                  onClick={this.handleReviewClick}
                >
                  Review
                </Link>
              </li>
            </ul>
          </>
        )}

        <hr />

        <Switch>
          {isShowCast && (
            <Route
              exact
              path={`${routes.movieDetails}${routes.cast}`}
              render={props => <Cast {...props} cast={cast} imgUrl={imgUrl} />}
            />
          )}
          {isShowReview && (
            <Route
              exact
              path={`${routes.movieDetails}${routes.reviews}`}
              render={props => <Reviews {...props} review={review} />}
            />
          )}

          {/* {!isShowCast && !isShowReview && <Redirect to={routes.home} />} */}
        </Switch>
      </>
    );
  }
}
