import {
  INITIALISE,
  UPDATE_FIELD
} from '../actions';



const initialState = {
  field: Array.from(Array(4)).map(() => Array.from(Array(4))),
  prevField: null,
  score: 0,
};

export default function znva(state = initialState, action) {
  const deepClonedState = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch(type) {
    case INITIALISE:
      return Object.assign({}, JSON.parse(JSON.stringify(initialState)), {
        field: [[2, null, null, null], [2, null, null, null], [2, null, null, null], [2, null, null, null]]
      });

    case UPDATE_FIELD:
      const prevField = JSON.parse(JSON.stringify(state.field));

      return Object.assign({}, deepClonedState, {
        field: payload.field,
        prevField: prevField
      });

    default:
      return state;
  }
}
