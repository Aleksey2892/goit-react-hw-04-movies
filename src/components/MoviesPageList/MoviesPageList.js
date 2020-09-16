import React from 'react';
import { Link } from 'react-router-dom';

import noImg from '../../assets/img/no-image.jpg';

import s from './styles.module.scss';

export default function MoviesPageList({ films, match, location, imgUrl }) {
  return (
    <ul className={s.ulList}>
      {films.map(({ id, poster_path, title }) => (
        <li key={id} className={s.filmItem}>
          <Link
            to={{
              pathname: `${match}/${id}`,
              state: { from: location },
            }}
          >
            <img src={poster_path ? imgUrl + poster_path : noImg} alt={title} />
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
