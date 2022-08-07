import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import loggedReducer from './reducers/isLogged';

export const store = createStore(loggedReducer, applyMiddleware(thunk));