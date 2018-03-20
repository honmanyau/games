export const INCREMENT_FRAME_COUNT = 'INCREMENT_FRAME_COUNT';
export const SET_FRAME_COUNT = 'SET_FRAME_COUNT';
export const UPDATE_PLAYING_FIELD = 'UPDATE_PLAYING_FIELD';
export const GENERATE_NEW_TETROMINO = 'GENERATE_NEW_TETROMINO';
export const UPDATE_TETROMINO_POSITION = 'UPDATE_TETROMINO_POSITION';
export const UPDATE_MATRIX = 'UPDATE_MATRIX';
export const UNSET_TETROMINO = 'UNSET_TETROMINO';

export function incrementFrameCount(frameCount) {
  return {
    type: INCREMENT_FRAME_COUNT
  }
}

export function setFrameCount(frameCount) {
  return {
    type: SET_FRAME_COUNT,
    payload: { frameCount }
  }
}

export function updateField(field) {
  return {
    type: UPDATE_PLAYING_FIELD,
    payload: { field }
  }
}

export function generateNewTetromino() {
  return {
    type: GENERATE_NEW_TETROMINO
  }
}

export function updateTetrominoPosition(tetrominoX, tetrominoY) {
  return {
    type: UPDATE_TETROMINO_POSITION,
    payload: { tetrominoX, tetrominoY }
  }
}

export function updateMatrix(matrix) {
  return {
    type: UPDATE_MATRIX,
    payload: { matrix }
  }
}

export function unsetTetromino() {
  return {
    type: UNSET_TETROMINO
  }
}
