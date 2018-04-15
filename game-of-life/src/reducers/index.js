import { INITIALISE } from '../actions';



const initialState = {
  game: null
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default function gol(state = initialState, action) {
  const { payload } = action;

  switch(action.type) {
    case INITIALISE:
      return Object.assign({}, clone(state), {
        game: payload.game
      });

    default:
      return state;
  }
}
