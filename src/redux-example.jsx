const redux = require('redux');

console.log('starting redux example')

let reducer = (state = {name: 'Anonymous'}, action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
}
let store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => {f
  }
));

// subscribe to changes
let unsubscribe = store.subscribe(() => {
  let state = store.getState();

  console.log('Name is', state.name);
  document.getElementById('app').innerHTML = state.name;
});
// unsubscribe()

let currentState = store.getState();
console.log('currentState', currentState);

let action = {
  type: 'CHANGE_NAME',
  name: 'Russel'
}
store.dispatch(action);


store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Everett'
});
