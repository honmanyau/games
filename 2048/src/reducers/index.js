import {
  INITIALISE,
  UPDATE_FIELD,
  UPDATE_RENDERED_FIELD,
  UPDATE_SCORE,
  SET_GAME_STATE,
  RESTART
} from '../actions';



const initialState = {
  field: Array.from(Array(4)).map(() => Array.from(Array(4))),
  prevField: null,
  renderedField: Array.from(Array(4)).map(() => Array.from(Array(4))),
  score: 0,
  game: ''
};

export default function znva(state = initialState, action) {
  const deepClonedState = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch(type) {
    case INITIALISE:
      return Object.assign({}, JSON.parse(JSON.stringify(initialState)), {
        field: payload.field,
        prevField: deepClonedState.field,
        renderedField: payload.field
      });

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

    case SET_GAME_STATE:
      return Object.assign({}, deepClonedState, {
        game: payload.game
      });

    case RESTART:
      return Object.assign({}, JSON.parse(JSON.stringify(initialState)));

    default:
      return state;
  }
}
