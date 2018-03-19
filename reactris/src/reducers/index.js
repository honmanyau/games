import  {
  INCREMENT_FRAME_COUNT,
  SET_FRAME_COUNT,
  UPDATE_PLAYING_FIELD,
  UPDATE_TETROMINO_POSITION,
  GENERATE_NEW_TETROMINO,
  UNSET_TETROMINO
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

    case SET_FRAME_COUNT:
      return Object.assign({}, deepClonedState, {
        frameCount: payload.frameCount
      });

    case UPDATE_PLAYING_FIELD:
      return Object.assign({}, deepClonedState, {
        field: JSON.parse(JSON.stringify(payload.field))
      });

    case GENERATE_NEW_TETROMINO:
      const tetrominoes = ['I', 'O', 'T', 'J', 'L', 'S', 'Z'];
      const randomIndex = Math.floor(Math.random() * tetrominoes.length);
      const tetromino = tetrominoes[randomIndex];

      return Object.assign({}, deepClonedState, {
        tetromino: tetromino,
        tetrominoX: initialState.tetrominoX,
        tetrominoY: initialState.tetrominoY
      });

    case UPDATE_TETROMINO_POSITION:
      return Object.assign({}, deepClonedState, {
        tetrominoX: payload.tetrominoX,
        tetrominoY: payload.tetrominoY
      });

    case UNSET_TETROMINO:
      return Object.assign({}, deepClonedState, {
        tetromino: null
      });

    default:
      return state;
  }
}
