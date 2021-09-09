import React, { Fragment } from 'react';
import spinner from './spinner2.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '100vw', height: '100vh' }}
      alt='loading...'
    />
  </Fragment>
);
