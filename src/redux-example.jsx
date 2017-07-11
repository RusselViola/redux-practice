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

// Map Redcuer and Action Generators
// ---------------------------------
let mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return{
        isFetching: true,
        url: undefined
      }
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      }
    default:
      return state;
  }
};

let startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
};

let completeLocationFetch = (url) => {
  type: 'COMPLETE_LOCATION_FETCH',
  url: url
};

let fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function(res) {
    let loc = res.data.loc;
    let baseUrl = 'http://maps.google.com?q='

    store.dispatch(completeLocationFetch(baseUrl + loc));
  })
};

let reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
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
