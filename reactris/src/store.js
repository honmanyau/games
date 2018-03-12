import { createStore, combineReducers } from 'redux';
import { circletReducer as circlet } from 'circlet';

const reducer = combineReducers({ circlet });
const store = createStore(reducer);

export default store;