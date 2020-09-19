import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';

import s from './styles.module.scss';

export default function Links({ url, onCheckLocation }) {
  return (
    <>
      <p className={s.infoTitle}>Additional Information</p>
      <ul className={s.addInfo}>
        <li className={s.info}>
          <NavLink
            className={s.infoLink}
            activeClassName={s.infoLinkActive}
            to={{
              pathname: `${url}${routes.cast}`,
              state: { from: onCheckLocation() },
            }}
          >
            Cast
          </NavLink>
        </li>
        <li className={s.info}>
          <NavLink
            className={s.infoLink}
            activeClassName={s.infoLinkActive}
            to={{
              pathname: `${url}${routes.reviews}`,
              state: { from: onCheckLocation() },
            }}
          >
            Review
          </NavLink>
        </li>
      </ul>
    </>
  );
}
