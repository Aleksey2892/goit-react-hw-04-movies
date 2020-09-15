import React, { Children } from 'react';
import NavMenu from '../NavMenu/NavMenu';

export default function Layout() {
  return (
    <div>
      <NavMenu />
      {Children}
    </div>
  );
}
