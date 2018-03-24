import { createStore, combineReducers } from 'redux';
import { circletReducer as circlet } from 'circlet';

import znva from './reducers';



const reducer = combineReducers({ circlet, znva });
const store = createStore(reducer);

export default store;
