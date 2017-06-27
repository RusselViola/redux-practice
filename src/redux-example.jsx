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
let store = redux.createStore(reducer);

let currentState = store.getState();
console.log('currentState', currentState);

let action = {
  type: 'CHANGE_NAME',
  name: 'Russel'
}
store.dispatch(action);

console.log('Name should be Russel', store.getState());
