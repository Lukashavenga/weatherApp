import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/index.jsx';

if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body)
    run();
else
    window.addEventListener('DOMContentLoaded', run, false);

function run() {
    ReactDOM.render(React.createElement(App),document.getElementById('main'));
}

