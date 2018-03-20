import { createStore, combineReducers } from 'redux';
import { circletReducer as circlet } from 'circlet';
import reactris from './reducers';

const reducer = combineReducers({ circlet, reactris });
const store = createStore(reducer);

export default store;
