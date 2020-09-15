import React from 'react';

export default function Reviews({ review }) {
  console.log(review);
  const isShowReview = review.length > 0;

  return (
    <>
      {isShowReview && (
        <ul>
          {review.map(({ author, content, id }) => {
            return (
              <li key={id}>
                <p>{author}</p>
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
