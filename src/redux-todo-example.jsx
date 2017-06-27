const redux = require('redux');

console.log('starting redux-todo-example')

let stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
}
let reducer = (state = stateDefault, action) => {
  return state;
}
let store = redux.createStore(reducer);

let currentState = store.getState();
console.log('currentState', currentState);
