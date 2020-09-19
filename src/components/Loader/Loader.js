import React from 'react';

import Spinner from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Loader() {
  return (
    <div className="LoaderBox">
      <Spinner
        type="Grid"
        color="#3f51b5"
        height={120}
        width={120}
        timeout={0}
      />
    </div>
  );
}
