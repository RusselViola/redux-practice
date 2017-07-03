const redux = require('redux');

console.log('starting redux example')

let stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

let nextHobbyId = 1;
let nextMovieId = 1;
let reducer = (state = stateDefault, action) => {
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

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Russel'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Coding'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Taking pictures of the cat'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Annie'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: "Wayne's World",
  genre: 'Comedy'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: "The Matrix: Reloaded",
  genre: 'General mistakes of Mankind'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});
