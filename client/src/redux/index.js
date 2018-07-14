import { combineReducers, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import auth from './reducers/auth';
import authors from './reducers/authors';

const rootReducer = combineReducers({
	auth,
	authors
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default store