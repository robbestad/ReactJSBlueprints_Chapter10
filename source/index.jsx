import './style.scss';
import polyfill from './polyfills';
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import App from './App';
const rootEl = document.getElementById('app');

const renderApp = (Component = App) => render(
  <App />,
  rootEl
);

if (env && env === "development") {
  if (module.hot) {
    module.hot.accept('./', () => renderApp());
  }
}

renderApp();
