import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes';

const NotFound = () => {
  return (
    <p>
      Page not found :(
      <br />
      Please go link to <Link to={routes.home}>the home page!</Link>
    </p>
  );
};

export default NotFound;
