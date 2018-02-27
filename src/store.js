import { createStore, applyMiddleware } from 'redux';
//import testB_reducer from './reducers/testB_reducer';
import root_reducer from './reducers/root_reducer';
import promiseMiddleware from 'redux-promise-middleware';

let createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

let store = createStoreWithMiddleware(root_reducer);

export default store;