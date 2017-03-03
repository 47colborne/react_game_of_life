import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
require('./assets/styles/application');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
