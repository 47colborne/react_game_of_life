import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App.jsx';
require('./assets/styles/application.css');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
