import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

export const initialState = {
  dogs: {
    all: [
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
    ],
    selected: {},
    error: false
  },
  owners: {
    all: [],
    selected: {},
    error: false
  }
};

const GET_DOGS = 'GET_DOGS';

//action creator

export const getDogsAction = (dogs) => ({type: GET_DOGS, dogs});

//thunks

// export const getDogs = () => {
//   return async (dispatch) => {
//    try {
//       let dogData = await axios.get('http://192.168.22.10:9999/api/dogs');
//       console.log(dogData)
//       dispatch(getDogsAction(initialState.dogs.all))
//     } catch (err) {
//      console.error(err);
//    }
//   };
// };

// export const getDogs = () => {
//   return  (dispatch) => {
//       dispatch(getDogsAction(initialState.dogs.all))
//    }
// };

//reducer

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GET_DOGS:
      console.log('***************** got it from dogs reducer');
      newState.dogs.all = action.dogs;
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
