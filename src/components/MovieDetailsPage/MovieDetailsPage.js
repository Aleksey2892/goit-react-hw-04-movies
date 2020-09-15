import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import routes from '../../routes';
import filmsApi from '../../services/filmsApi';

import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

class MovieDetailsPage extends Component {
  state = {
    details: null,
    cast: null,
    review: null,
    poster: 'https://image.tmdb.org/t/p/w300',
  };

  componentDidMount() {
    const { showId } = this.props.match.params;

    this.fetchForDetails(showId);

    filmsApi.fetchReviewWithId(613504);
  }

  fetchForDetails = async id => {
    try {
      const details = await filmsApi.fetchWithId(id);

      this.setState({ details });
    } catch (err) {
      console.log(err);
    }
  };

  handleCastClick = async () => {
    const { id } = this.state.details;

    try {
      const { cast } = await filmsApi.fetchCastWithId(id);
      console.log(cast);

      this.setState({ cast });
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

  render() {
    const { details, cast, review, poster } = this.state;
    const isShowDetails = details;
    const isShowCast = cast;
    const isShowReview = review;

    return (
      <>
        {isShowDetails && (
          <>
            {/* <h1>Hello! {details.id}</h1> */}
            <div>
              <img
                src={poster + details.poster_path}
                alt={details.original_title}
              />
              <ul>
                <li>
                  {details.original_title} ({details.release_date})
                </li>
                <li>User Score: {details.vote_average}%</li>
                <li>Overview</li>
                <li>{details.overview}</li>
                <li>Genres</li>
                <li>
                  {details.genres.map(genre => (
                    <span key={genre.id}>{genre.name} </span>
                  ))}
                </li>
              </ul>
            </div>

            <hr />
            <p>Additional Information</p>
            <ul>
              <li>
                <Link
                  to={`${this.props.match.url}${routes.cast}`}
                  onClick={this.handleCastClick}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={`${this.props.match.url}${routes.reviews}`}
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
              render={props => <Cast {...props} cast={cast} poster={poster} />}
            />
          )}
          {isShowReview && (
            <Route
              exact
              path={`${routes.movieDetails}${routes.reviews}`}
              render={props => <Reviews {...props} review={review} />}
            />
          )}
        </Switch>
      </>
    );
  }
}

export default MovieDetailsPage;
