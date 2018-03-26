import {
  INITIALISE,
  UPDATE_FIELD,
  UPDATE_RENDERED_FIELD,
  UPDATE_SCORE
} from '../actions';



const initialState = {
  field: Array.from(Array(4)).map(() => Array.from(Array(4))),
  prevField: null,
  renderedField: Array.from(Array(4)).map(() => Array.from(Array(4))),
  score: 0,
  nya: null
};

export default function znva(state = initialState, action) {
  const deepClonedState = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch(type) {
    case INITIALISE:
    case UPDATE_FIELD:
      const prevField = JSON.parse(JSON.stringify(state.field));

      return Object.assign({}, deepClonedState, {
        field: payload.field,
        prevField: prevField
      });

    case UPDATE_RENDERED_FIELD:
      return Object.assign({}, deepClonedState, {
        renderedField: payload.renderedField
      });

    case UPDATE_SCORE:
      return Object.assign({}, deepClonedState, {
        score: state.score + payload.score
      });

    default:
      return state;
  }
}
