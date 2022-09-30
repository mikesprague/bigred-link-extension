import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App.jsx';

import { initIcons } from './modules/helpers.js';

import './index.scss';

initIcons();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
