import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';
import { firebaseConfig } from '../configs/fireBase';

firebase.initializeApp(firebaseConfig);

export const initialState = {
  email: '',
  password: '',
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
export const loggedIn = (email, password) =>({type: LOGGED_IN, email, password});

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
    await firebase.auth().createUserWithEmailAndPassword(email, password);
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
  return (dispatch) => {
    try {
    dispatch(loggedIn(email, password));
  } catch (error) {
    console.error(error);
  }
};
};

//reducer

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GOT_DOGS:
      console.log('***************** got it from dogs reducer');
      newState.dogs.all = action.dogs;
      break;
    case SIGNED_UP:
      console.log('******* signed up in reducer');
      newState.email = action.email;
      newState.password = action.password;
      break;
      case LOGGED_IN:
          console.log('******* login in reducer');
          newState.email = action.email;
          newState.password = action.password;
          break;
    default:
      break;
  }
  return newState;
};

const store = createStore(  //creates store and attaches middleware (logger and devtools)
  reducer,
  applyMiddleware(thunkMiddleware)
  );

export default store;
