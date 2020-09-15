import React from 'react';
import { Link } from 'react-router-dom';

export default function MoviesPageList({ films, match, location }) {
  return (
    <>
      <ul>
        {films.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `${match}/${id}`,
                state: { from: location },
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
