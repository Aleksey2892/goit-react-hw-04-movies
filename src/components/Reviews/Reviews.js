import React from 'react';

export default function Reviews({ review }) {
  const isShowReview = review;

  return (
    <>
      {isShowReview && (
        <ul>
          {review.map(({ author, content, id }) => {
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
