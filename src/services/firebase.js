import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDu4a3NSPv2ylKOGWIV79NqVuN-9R-ikFs',
  authDomain: 'pokemon-game-478c3.firebaseapp.com',
  databaseURL: 'https://pokemon-game-478c3-default-rtdb.firebaseio.com',
  projectId: 'pokemon-game-478c3',
  storageBucket: 'pokemon-game-478c3.appspot.com',
  messagingSenderId: '484399565934',
  appId: '1:484399565934:web:e5d4160f630c22550eaa7f',
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export const fb = firebase;

export default database;
