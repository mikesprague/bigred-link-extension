import React from 'react';

import './Footer.scss';

export const Footer = () => (
  <footer>
    <p className="copyright-text">
      Copyright &copy; {new Date().getFullYear()}{' '}
      <a href="https://bigred.link" rel="noopener noreferrer" target="_blank">
        BigRed.link
      </a>
      . All Rights Reserved
    </p>
    <p className="no-affiliation-text">
      <small>
        BigRed.link is <strong>NOT</strong> affiliated with or endorsed by
        Cornell University.
      </small>
    </p>
  </footer>
);
