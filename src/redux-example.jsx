const redux = require('redux');
const axios = require('axios');

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

let startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
};

let completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
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

  console.log('New State', store.getState());

  if(state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if(state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>'
  }
});
// unsubscribe()

fetchLocation();


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
