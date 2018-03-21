import  {
  INCREMENT_FRAME_COUNT,
  SET_FRAME_COUNT,
  UPDATE_PLAYING_FIELD,
  UPDATE_TETROMINO_POSITION,
  UPDATE_MATRIX,
  SET_TETROMINO,
  UNSET_TETROMINO,
  SET_COMBINED_FIELD,
  UPDATE_LINES,
  SET_GAME_STATUS
} from '../actions';



const initialState = {
  field: Array.from(Array(21)).map(() => Array.from(Array(10))),
  combinedField: Array.from(Array(21)).map(() => Array.from(Array(10))),
  speed: 1000,
  tetromino: null,
  tetrominoX: 3,
  tetrominoY: 0,
  matrix: null,
  frameCount: 0,
  game: '',
  lines: 0
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

    case SET_FRAME_COUNT:
      return Object.assign({}, deepClonedState, {
        frameCount: payload.frameCount
      });

    case UPDATE_PLAYING_FIELD:
      return Object.assign({}, deepClonedState, {
        field: JSON.parse(JSON.stringify(payload.field))
      });

    case UPDATE_TETROMINO_POSITION:
      return Object.assign({}, deepClonedState, {
        tetrominoX: payload.tetrominoX,
        tetrominoY: payload.tetrominoY
      });

    case UPDATE_MATRIX:
      return Object.assign({}, deepClonedState, {
        matrix: payload.matrix
      });

    case SET_TETROMINO:
      return Object.assign({}, deepClonedState, {
        tetromino: payload.tetromino,
        matrix: payload.matrix
      });

    case UNSET_TETROMINO:
      return Object.assign({}, deepClonedState, {
        tetromino: null,
        matrix: null,
        tetrominoX: initialState.tetrominoX,
        tetrominoY: initialState.tetrominoY
      });

    case SET_COMBINED_FIELD:
      return Object.assign({}, deepClonedState, {
        combinedField: payload.combinedField
      });

    case UPDATE_LINES:
      return Object.assign({}, deepClonedState, {
        lines: state.lines + payload.lines
      });

    case SET_GAME_STATUS:
      return Object.assign({}, deepClonedState, {
        game: payload.game
      });

    default:
      return state;
  }
}
