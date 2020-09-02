import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app.js';
import smoothscroll from 'smoothscroll-polyfill';


smoothscroll.polyfill();

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


