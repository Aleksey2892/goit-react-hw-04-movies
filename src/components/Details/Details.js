import React from 'react';

import noImg from '../../assets/img/no-image.jpg';

import s from './styles.module.scss';

export default function Details({ details }) {
  return (
    <div className={s.aboutFilmBox}>
      <img
        src={details.poster_path ? details.poster_path : noImg}
        alt={details.original_title}
      />

      <div className={s.details}>
        <h3>
          {details.original_title} ({details.release_date})
        </h3>
        <h3>User Score: {details.vote_average * 10}%</h3>
        <h3>Overview</h3>
        <p>{details.overview}</p>
        <h3>Genres</h3>
        <p>
          {details.genres &&
            details.genres.map(genre => (
              <span key={genre.id}>{genre.name} </span>
            ))}

          {!details.genres && <span>No genres</span>}
        </p>
      </div>
    </div>
  );
}
