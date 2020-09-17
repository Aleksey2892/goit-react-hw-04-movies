import React from 'react';
import { Link } from 'react-router-dom';

import noImg from '../../assets/img/no-image.jpg';

import s from './styles.module.scss';

export default function MoviesPageList({ films, match, location }) {
  return (
    <ul className={s.ulList}>
      {films.map(({ id, poster_path, title }) => (
        <li key={id} className={s.filmItem}>
          <Link
            className={s.link}
            to={{
              pathname: `${match}/${id}`,
              state: { from: location },
            }}
          >
            <img src={poster_path ? poster_path : noImg} alt={title} />
            <p className={s.nameFilm}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
