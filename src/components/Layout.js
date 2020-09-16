import React from 'react';

import Header from './Header';

import s from './styles.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className={s.layout}>{children}</div>
    </>
  );
}
