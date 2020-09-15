import React from 'react';
// import PropTypes from 'prop-types';

import routes from '../../routes';

import { Link } from 'react-router-dom';

const Cast = ({ cast, poster }) => {
  return (
    <>
      {cast.map(({ id, name, profile_path }) => (
        <div key={id}>
          <img
            src={
              profile_path
                ? poster + profile_path
                : 'https://lh3.googleusercontent.com/proxy/yK2BjRedeP68ERNs0eW5gE80DQDH2dycgR8vNLxyRED0Ce-4KH0_Rmz_NrW7I5NkTnU9cvxozBx1JBI'
            }
            alt={id}
          />
          <p>{name}</p>
        </div>
      ))}
    </>
  );
};

export default Cast;
