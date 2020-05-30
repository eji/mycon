import firebase from 'firebase';
import diConfig from '../diConfig';
import firebaseConfig from '../firebaseConfig';

export default function initApi(): void {
  firebase.initializeApp(firebaseConfig);
  diConfig();
}
