import  {
  INCREMENT_FRAME_COUNT,
  RESET_FRAME_COUNT,
  UPDATE_PLAYING_FIELD
} from '../actions';



const initialState = {
  field: Array.from(Array(20)).map(() => Array.from(Array(10))),
  speed: 1000,
  tetromino: null,
  tetrominoX: 3,
  tetrominoY: 0,
  frameCount: 0
};

export default function reactris(state = initialState, action) {
  const deepClonedState = Object.assign({}, state, {
    field: JSON.parse(JSON.stringify(state.field))
  });
  const { payload } = action;

  switch(action.type) {
    case INCREMENT_FRAME_COUNT:
      return Object.assign({}, deepClonedState, {
        frameCount: state.frameCount + 1
      });

    case RESET_FRAME_COUNT:
      return Object.assign({}, deepClonedState, {
        frameCount: payload.frameCount
      });

    case UPDATE_PLAYING_FIELD:
      return Object.assign({}, deepClonedState, {
        field: JSON.parse(JSON.stringify(payload.field))
      });

    default:
      return state;
  }
}
