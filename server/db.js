import firebase from 'firebase';
import { firebaseConfig } from '../configs/fireBase';
require('firebase/firestore');

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
