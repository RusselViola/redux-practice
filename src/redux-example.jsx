const redux = require('redux');
const axios = require('axios');

console.log('starting redux example')

const actions = require('./actions/index');
const store = require('./store/configureStore').configure();

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


let currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Russel'));

store.dispatch(actions.addHobby('Coding'));

store.dispatch(actions.addHobby('Taking pictures of the cat'));

store.dispatch(actions.removeHobby(2));

store.dispatch(actions.changeName('Annie'));

store.dispatch(actions.addMovie('Waynes World', 'Comedy'));

store.dispatch(actions.addMovie('The Matrix: Reloaded', 'General mistakes of Mankind'));

store.dispatch(actions.removeMovie(1));
