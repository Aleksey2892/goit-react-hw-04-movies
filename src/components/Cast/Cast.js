import React from 'react';

import noAvatar from '../../utils/no-avatar-350x350.jpg';

export default function Cast({ cast, poster }) {
  const isShowCast = cast.length > 0;

  return (
    <>
      {isShowCast && (
        <ul>
          {cast.map(({ id, name, character, profile_path }) => {
            return (
              <li key={id}>
                <img
                  src={profile_path ? poster + profile_path : noAvatar}
                  alt={id}
                />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      )}

      {!isShowCast && (
        <>
          <p>We don't have any cast for this movie.</p>
        </>
      )}
    </>
  );
}
