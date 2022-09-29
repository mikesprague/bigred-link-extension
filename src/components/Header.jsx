import React from 'react';
import { version } from '../../package.json';

import './Header.scss';

export const Header = () => (
  <header>
    <h1 className="page-title" title={`BigRed.link v${version}`}>
      <a href="https://bigred.link" rel="noopener noreferrer" target="_blank">BigRed.link</a>
    </h1>
  </header>
);
