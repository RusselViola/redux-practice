const redux = require('redux');
const {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require('./../reducers/index');

export const configure = () => {
  let reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
  });

  let store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
