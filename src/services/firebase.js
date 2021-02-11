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

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.fb = firebase;
    this.database = this.fb.database();
  }

  getPokemonsBySockets = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      cb(snapshot.val());
    });
  };

  // getPokemonsAtOnce = async () => {
  //   const snapshot = await this.database.ref('pokemons').once('value');
  //   return snapshot.val();
  // };

  postPokemon = (dbID, pokemon) => {
    this.database.ref(`pokemons/${dbID}`).set(pokemon);
  };

  addPokemon = (pokemon) => {
    const newDbID = this.database.ref().child('pokemons').push().key;
    this.database.ref(`pokemons/${newDbID}`).set(pokemon);
  };
}

export default Firebase;
