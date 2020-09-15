import React from 'react';
import { Link } from 'react-router-dom';

const MoviesPageList = ({ films, match }) => {
  return (
    <>
      <ul>
        {films.map(({ id, title }) => (
          <li key={id}>
            <Link to={`${match}/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesPageList;
