import { createStore, combineReducers } from 'redux';
import { circletReducer as circlet } from 'circlet';
import flatris from './reducers';



const reducer = combineReducers({ circlet, flatris });
const store = createStore(reducer);

export default store;
