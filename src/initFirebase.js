import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyACu7WDmGFImhUvb7w90BxNwwp297B5_u4',
  authDomain: 'snippets-8d5e0.firebaseapp.com',
  databaseURL: 'https://snippets-8d5e0.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
