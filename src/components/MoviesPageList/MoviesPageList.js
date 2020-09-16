import React from 'react';
import { Link } from 'react-router-dom';

import noAvatar from '../../utils/no-image.jpg';

import s from './styles.module.scss';

export default function MoviesPageList({ films, match, location, imgUrl }) {
  console.log(films);

  return (
    <>
      <ul className={s.ulList}>
        {films.map(({ id, poster_path, title }) => (
          <li key={id} className={s.filmItem}>
            <img
              src={poster_path ? imgUrl + poster_path : noAvatar}
              alt={title}
            />
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
