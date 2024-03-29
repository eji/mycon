/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-namespace */
import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import diConfig from './diConfig';
import { initErrorTracker } from './utils/errorTrackerForBrowser';

/**
 * for Sentry
 *
 * This allows TypeScript to detect our global value
 */
declare global {
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}
global.__rootdir__ = __dirname || process.cwd();

initErrorTracker();
diConfig();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
