import React, { Component } from 'react';

import filmsApi from '../../services/filmsApi';

export default class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const id = this.props.match.params.showId;

    const { results } = await filmsApi.fetchReviewById(id);

    this.setState({ reviews: results });
  }

  render() {
    const { reviews } = this.state;
    const isShowReview = reviews.length > 0;

    return (
      <>
        {isShowReview && (
          <ul>
            {reviews.map(({ author, content, id }) => {
              return (
                <li key={id}>
                  <p>Author: {author}</p>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        )}

        {!isShowReview && (
          <>
            <p>We don't have any reviews for this movie.</p>
          </>
        )}
      </>
    );
  }
}
