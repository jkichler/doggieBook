import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';
import { firebaseConfig } from '../configs/fireBase';
import * as Facebook from 'expo-facebook';
import { db } from '../server/db';

import { Constants } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import {Platform} from 'react-native'

// Use this to fix bug with Expo and firebase
//expo-web is inspired or based on react-native-web
// which introduces a 'web' as platform value
if (Platform.OS !== 'web') {
  // eslint-disable-next-line no-native-reassign
  window = undefined;
}



export const initialState = {
  user: {
    name: '',
    age: 0,
    breed: '',
    imgUrl: 'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
    owner: '',
    email: '',
    password: '',
    walking: false,
    loggedIn: false,
    location: null,
    error: null
  },
  dogs: [],
};

const GOT_DOGS = 'GOT_DOGS';
const SIGNED_UP = 'SIGNED_UP';
const LOGGED_IN = 'LOGGED_IN';
const WALKING = 'WALKING';
const SWIPED_DOG = 'SWIPED_DOG';

//action creator

export const gotDogs = (dogs) => ({type: GOT_DOGS, dogs});
export const signedUp = (email, password) => ({type: SIGNED_UP, email, password});
export const loggedIn = (user) => ({type: LOGGED_IN, user});
export const areWalking =  (user, location) => ({type: WALKING, user, location});
export const swipedDog = (dogs) => ({type: SWIPED_DOG, dogs});

//thunks


export const getDogs = () => {
  return async (dispatch) => {
    try {
      const docRef = await db.collection('dogs');
      const query = await docRef.where('walking', '==', true);
      let dogs = [];
        query.get().then(function(querySnapshot){
        querySnapshot.forEach(function (doc){
          let dog = doc.data();
          dog.id = doc.id;
          dogs.push(dog);
        })
        dispatch(gotDogs(dogs));
      }).catch(error => console.error(error))
    } catch (error) {
      console.error(error);
    }
   }
};

export const signUp = (userData, password) => {
  return async (dispatch) => {
    try {
    let { user } = await firebase.auth().createUserWithEmailAndPassword(userData.email, password);
    db.collection('dogs').doc(user.uid).set(userData);
    dispatch(signedUp(userData));
  } catch (error) {
    console.error(error);
  }
};
};

const _getLocationAsync = async () => {
  try {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
     console.error(
        'Permission to access location was denied',
      );
    }
    let location = await Location.getCurrentPositionAsync({});
    return location;
  } catch (err) {
    console.error(err);
  }
};

export const goWalking = (user) => {
  return async (dispatch) => {
    try {

      if (Platform.OS === 'android' && !Constants.isDevice) {
        console.error('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
      } else {
        location = await _getLocationAsync();
        walking = true;
        const docRef = db.collection('dogs').doc(user.id);
        docRef.get().then(async function(doc) {
          if (doc.exists) {
            await docRef.update({ location: location,
            walking: true });
          } else {
            console.error('no user doc found');
          }
        }).catch(error => console.error(error));
        dispatch(areWalking(user, location))
      }
    } catch (err) {
      console.error(err);
    }
}
}


export const login = (email, password) => {
  return async (dispatch) => {
    try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    const docRef = db.collection('dogs').doc(user.uid);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        docRef.update({
          walking: false });
        let data = doc.data();
        data.id = doc.id;
        data.walking = false;
        dispatch(loggedIn(data));
      } else {
        console.log('document does not exist')
      }
    }).catch(err => console.error(err));
  } catch (error) {
    console.error(error);
  }
};
};

export const loginWithFacebook = () => {
  return async (dispatch) => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '2085186958442224',
        { permissions: ['public_profile'] }
        );
      if (type === 'success') {
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .signInWithCredential(credential)
          const user = firebase.auth().currentUser;
          const docRef = db.collection('dogs').doc(user.uid);
          docRef.get().then(function(doc) {
            if (doc.exists) {
              docRef.update({
                walking: false });
              let data = doc.data();
              data.id = user.uid;
              data.walking = false;
              dispatch(loggedIn(data));
            } else {
              db.collection('dogs').doc(user.uid).set({name: 'facebook test'});
            }
          }).catch(error => console.error(error));


          if (user) dispatch(loggedIn(user));
    }
  } catch (error) {
      console.error(error);
    }
  }
}


//reducer

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SWIPED_DOG: {
      console.log('made it to reducer')
      action.dogs.shift();
      console.log(action.dogs);
      newState.dogs = action.dogs;
      return newState;
    }
    case WALKING: {
      newState.user.walking = true;
      newState.user.location = action.location;
      return newState;
    }
    case GOT_DOGS:
      newState.dogs = action.dogs;
      return newState;
    case SIGNED_UP:
      newState.email = action.email;
      newState.password = action.password;
      return newState;
      case LOGGED_IN:
          newState.user = action.user;
          newState.user.loggedIn = true;
          return newState;
    default:
      return state;
  }
};

const store = createStore(  //creates store and attaches middleware (logger and devtools)
  reducer,
  applyMiddleware(thunkMiddleware)
  );

export default store;
