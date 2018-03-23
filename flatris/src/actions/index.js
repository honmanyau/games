export const INCREMENT_FRAME_COUNT = 'INCREMENT_FRAME_COUNT';
export const SET_FRAME_COUNT = 'SET_FRAME_COUNT';
export const UPDATE_PLAYING_FIELD = 'UPDATE_PLAYING_FIELD';
export const UPDATE_TETROMINO_POSITION = 'UPDATE_TETROMINO_POSITION';
export const UPDATE_MATRIX = 'UPDATE_MATRIX';
export const SET_TETROMINO = 'SET_TETROMINO';
export const UNSET_TETROMINO = 'UNSET_TETROMINO';
export const SET_COMBINED_FIELD = 'SET_COMBINED_FIELD';
export const UPDATE_LINES = 'UPDATE_LINES';
export const SET_GAME_STATUS = 'SET_GAME_STATUS';
export const RESTART = 'RESTART';

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

export function setTetromino(tetromino = null, matrix = null) {
  return {
    type: SET_TETROMINO,
    payload: { tetromino, matrix }
  }
}

export function unsetTetromino() {
  return {
    type: UNSET_TETROMINO
  }
}

export function setCombinedField(field) {
  return {
    type: SET_COMBINED_FIELD,
    payload: { combinedField: field }
  }
}

export function updateLines(lines) {
  return {
    type: UPDATE_LINES,
    payload: { lines }
  }
}

export function setGameStatus(game) {
  return {
    type: SET_GAME_STATUS,
    payload: { game }
  }
}

export function restart() {
  return {
    type: RESTART
  }
}
