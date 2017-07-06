const redux = require('redux');

console.log('starting redux example')

let oldReducer = (state = stateDefault, action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      };
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
        // shorthand syntax for arrow function  ^^^^^^^^^^^^^^^^^^^^^^
      }
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
        ]
      }
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.id)
        // shorthand syntax for arrow function  ^^^^^^^^^^^^^^^^^^^^^^
      }
    default:
      return state;
  }
};

// Name Reducer and Action Generators
// ----------------------------------
let nameReducer = (state = 'Anonymous', action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

let changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name: name
  }
};

// Hobbies Redcuer and Action Generators
// -------------------------------------
let nextHobbyId = 1;
let hobbiesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ]
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id)
      // shorthand syntax for arrow function  ^^^^^^^^^^^^^^
    default:
      return state;
  }
}

let addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby: hobby
  }
};

let removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id: id
  }
};

// Movies Redcuer and Action Generators
// ------------------------------------
let nextMovieId = 1;
let moviesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ]
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id)
      // shorthand syntax for arrow function  ^^^^^^^^^^^^^^
    default:
      return state;
  }
}

let addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title: title,
    genre: genre
  }
}

let removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id: id
  }
}

let reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

let store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// subscribe to changes
let unsubscribe = store.subscribe(() => {
  let state = store.getState();

  document.getElementById('app').innerHTML = state.name;
  console.log('Name is', state.name);

  console.log('New State', store.getState());
});
// unsubscribe()

let currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(changeName('Russel'));

store.dispatch(addHobby('Coding'));

store.dispatch(addHobby('Taking pictures of the cat'));

store.dispatch(removeHobby(2));

store.dispatch(changeName('Annie'));

store.dispatch(addMovie('Waynes World', 'Comedy'));
store.dispatch(addMovie('The Matrix: Reloaded', 'General mistakes of Mankind'));
store.dispatch(removeMovie(1));

store.dispatch({
  type: 'ADD_MOVIE',
  title: "The Matrix: Reloaded",
  genre: 'General mistakes of Mankind'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});
