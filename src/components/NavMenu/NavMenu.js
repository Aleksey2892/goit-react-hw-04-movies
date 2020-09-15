import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';

const NavMenu = () => {
  return (
    <>
      <ul className="nav-ul">
        <li className="nav-list">
          <NavLink
            exact
            to={routes.home}
            className="nav-link"
            activeClassName="nav-link_active"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink
            to={routes.movies}
            className="nav-link"
            activeClassName="nav-link_active"
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavMenu;
