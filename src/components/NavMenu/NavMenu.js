import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';

import s from './styles.module.scss';

export default function NavMenu() {
  return (
    <ul className={s.navUl}>
      <li className={s.navList}>
        <NavLink
          exact
          to={routes.home}
          className={s.navLink}
          activeClassName={s.navLink_active}
        >
          Home
        </NavLink>
      </li>
      <li className={s.navList}>
        <NavLink
          to={routes.movies}
          className={s.navLink}
          activeClassName={s.navLink_active}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
}
