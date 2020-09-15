import React from 'react';

import routes from '../../routes';

import { Link } from 'react-router-dom';

const Reviews = ({ review }) => {
  console.log(review);
  return (
    <>
      {review.map(({ author, content, id }) => (
        <div key={id}>
          <p>{author}</p>
          <p>{content}</p>
        </div>
      ))}
    </>
  );
};

export default Reviews;
