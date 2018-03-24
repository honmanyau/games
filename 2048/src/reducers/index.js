import { INITIALISE } from '../actions';



const initialState = {
  field: Array.from(Array(4)).map(() => Array.from(Array(4))),
  score: 0,
};

export default function znva(state = initialState, action) {
  const deepClonedState = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch(type) {
    case INITIALISE:
      return Object.assign({}, JSON.parse(JSON.stringify(initialState)), {
        field: payload.field
      });

    default:
      return state;
  }
}
