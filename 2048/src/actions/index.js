export const INITIALISE = 'INITIALISE';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const UPDATE_RENDERED_FIELD = 'UPDATE_RENDERED_FIELD';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const SET_GAME_STATE = 'SET_GAME_STATE';
export const RESTART = 'RESTART';

export function initialise() {
  const field = Array.from(Array(4)).map(() => Array.from(Array(4)));
  const len = field.length;
  const x = Math.floor(Math.random() * len);
  const y = Math.floor(Math.random() * len);

  field[y][x] = 2;

  return {
    type: INITIALISE,
    payload: { field }
  }
}

export function updateField(field) {
  return {
    type: UPDATE_FIELD,
    payload: { field }
  }
}

export function updateRenderedField(renderedField) {
  return {
    type: UPDATE_RENDERED_FIELD,
    payload: { renderedField }
  }
}

export function updateScore(score) {
  return {
    type: UPDATE_SCORE,
    payload: { score }
  }
}

export function setGameState(game) {
  return {
    type: SET_GAME_STATE,
    payload: { game }
  }
}

export function restart() {
  console.log('nya')
  return {
    type: RESTART
  }
}
