import { createStore, combineReducers } from 'redux';
import { circletReducer as circlet } from 'circlet';

import gol from './reducers';



const reducer = combineReducers({ circlet, gol });
const store = createStore(reducer);

export default store;
