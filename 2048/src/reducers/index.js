import {
  INITIALISE,
  SET_FIELD,
  UPDATE_RENDERED_FIELD,
  SET_MOVE_DIRECTION,
  UPDATE_SCORE,
  SET_ANIMATION_PROGRESS,
  SET_GAME_STATE,
} from '../actions';



const initialField = Array.from(Array(4)).map(() => {
  return Array.from(Array(4)).map(() => {
    return { type: null, offsetX: 0, offsetY: 0 }
  });
});

const initialState = {
  field: initialField,
  renderedField: initialField,
  moveDirection: null,
  score: 0,
  animationProgress: 0,
  game: ''
};

export default function znva(state = initialState, action) {
  const deepClonedState = JSON.parse(JSON.stringify(state));
  const { type, payload } = action;

  switch(type) {
    case INITIALISE:
      return Object.assign({}, JSON.parse(JSON.stringify(initialState)), {
        field: payload.field,
        renderedField: payload.field
      });

    case SET_FIELD:
      return Object.assign({}, deepClonedState, {
        field: payload.field
      });

    case UPDATE_RENDERED_FIELD:
      return Object.assign({}, deepClonedState, {
        renderedField: payload.renderedField
      });

    case SET_MOVE_DIRECTION:
      return Object.assign({}, deepClonedState, {
        moveDirection: payload.moveDirection
      });

    case UPDATE_SCORE:
      return Object.assign({}, deepClonedState, {
        score: state.score + payload.score
      });

    case SET_ANIMATION_PROGRESS:
      return Object.assign({}, deepClonedState, {
        animationProgress: payload.animationProgress
      });

    case SET_GAME_STATE:
      return Object.assign({}, deepClonedState, {
        game: payload.game
      });

    default:
      return state;
  }
}
