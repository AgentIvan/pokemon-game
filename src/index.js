import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { FirebaseContext } from './context/firebaseContext';
import Firebase from './services/firebase';

import App from './App';

import './index.css';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseContext.Provider>,
  document.querySelector('#root'),
);
