import React from 'react';

import NavMenu from './NavMenu/NavMenu';

import s from './styles.module.scss';

export default function Header() {
  return (
    <header className={s.header}>
      <NavMenu />
    </header>
  );
}
