const redux = require('redux');

console.log('starting redux-todo-example')

let stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
}
let reducer = (state = stateDefault, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
};
let store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// subscribe to changes
store.subscribe(() => {
  let state = store.getState();

  document.getElementById('app').innerHTML = state.searchText;
});
// unsubscribe();

let currentState = store.getState();
console.log('currentState', currentState);

let action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'work'
}
store.dispatch(action);
console.log('searchText should be "work"', store.getState());

store.dispatch({
  type: "CHANGE_SEARCH_TEXT",
  searchText: 'dog'
});

store.dispatch({
  type: "CHANGE_SEARCH_TEXT",
  searchText: 'other stuff'
});
