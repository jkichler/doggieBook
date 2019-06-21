import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';
import { firebaseConfig } from '../configs/fireBase';
import * as Facebook from 'expo-facebook';
import { db } from '../server/db';

import {Platform} from 'react-native'

// Use this to fix bug with Expo and firebase
//expo-web is inspired or based on react-native-web
// which introduces a 'web' as platform value
if (Platform.OS !== 'web') {
  window = undefined
}


//firebase.initializeApp(firebaseConfig);

export const initialState = {
  user: {},
  loggedIn: false,
  dogs: []
};

const fakeDogs = {
  dogs:  [
      {
        id: '1',
        name: 'Milly',
        age: '6',
        breed: 'Shih Tzu',
        img: 'https://192.168.22.10:9999/milly.jpg'
      },
      {
        id: '2',
        name: 'Hailey',
        age: '13',
        breed: 'Shih Tzu/Lasa Apso',
        img: 'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'
      },
      {
        id: '3',
        name: 'Jasper',
        age: '13',
        breed: 'Labrador Retriever',
        img: 'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'
      },
      {
        id: 4,
        name: 'Charlie',
        age: '4',
        breed: 'Blue Healer',
        img: 'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'
      }
    ]
  };

const GOT_DOGS = 'GOT_DOGS';
const SIGNED_UP = 'SIGNED_UP';
const LOGGED_IN = 'LOGGED_IN';

//action creator

export const gotDogs = (dogs) => ({type: GOT_DOGS, dogs});
export const signedUp = (email, password) =>({type: SIGNED_UP, email, password});
export const loggedIn = (user) =>({type: LOGGED_IN, user});

//thunks

// export const getDogs = () => {
//   return async (dispatch) => {
//    try {
//       let dogData = await axios.get('http://192.168.22.10:9999/api/dogs');
//       console.log(dogData)
//       dispatch(gotDogs(initialState.dogs.all))
//     } catch (err) {
//      console.error(err);
//    }
//   };
// };

export const getDogs = () => {
  return  (dispatch) => {
      dispatch(gotDogs(fakeDogs))
   }
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
    let { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    db.collection('dogs').doc(user.uid).set({name: 'test name'});
    dispatch(signedUp(email, password));
  } catch (error) {
    console.error(error);
  }
};
};

// export const signUp = (email, password) => {
//   return (dispatch) => {
//     try {
//     dispatch(signedUp(email, password));
//   } catch (error) {
//     console.error(error);
//   }
// };
// };

export const login = (email, password) => {
  return async (dispatch) => {
    try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    const docRef = db.collection('dogs').doc(user.uid);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        let data = doc.data();
        dispatch(loggedIn(data));
      } else {
        console.log('document does not exist')
      }
    });
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
        alert('success');
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .signInWithCredential(credential)
          const user = firebase.auth().currentUser;
          const docRef = db.collection('dogs').doc(user.uid);
          docRef.get().then(function(doc) {
            if (doc.exists) {
              let data = doc.data();
              dispatch(loggedIn(data));
            } else {
              db.collection('dogs').doc(user.uid).set({name: 'facebook test'});
            }
          });


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
    case GOT_DOGS:
      newState.dogs.all = action.dogs;
      return newState;
    case SIGNED_UP:
      newState.email = action.email;
      newState.password = action.password;
      return newState;
      case LOGGED_IN:
          newState.user = action.user;
          newState.loggedIn = true;
          return newState;
    default:
      break;
  }
  return state;
};

const store = createStore(  //creates store and attaches middleware (logger and devtools)
  reducer,
  applyMiddleware(thunkMiddleware)
  );

export default store;
