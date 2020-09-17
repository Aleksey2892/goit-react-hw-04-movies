import React, { Component } from 'react';

import filmsApi from '../../services/filmsApi';
import updateCastImg from '../../utils/updateCastImg';

import noAvatar from '../../assets/img/no-avatar-350x350.jpg';

import s from './styles.module.scss';

export default class Cast extends Component {
  state = {
    casts: [],
  };

  async componentDidMount() {
    const id = this.props.match.params.showId;

    try {
      const { cast } = await filmsApi.fetchCastWithId(id);

      this.setState({ casts: updateCastImg(cast) });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { casts } = this.state;
    const isShowCast = casts.length > 0;

    return (
      <>
        {isShowCast && (
          <ul className={s.castUl}>
            {casts.map(({ id, name, character, profile_path }) => {
              return (
                <li key={id} className={s.castList}>
                  <img
                    src={profile_path ? profile_path : noAvatar}
                    alt={id}
                    className={s.castImg}
                  />

                  <p>Name: {name}</p>
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
}
