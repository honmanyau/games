export const INITIALISE = 'INITIALISE';
export const SET_FIELD = 'SET_FIELD';
export const UPDATE_RENDERED_FIELD = 'UPDATE_RENDERED_FIELD';
export const SET_MOVE_DIRECTION = 'SET_MOVE_DIRECTION';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const SET_ANIMATION_PROGRESS = 'SET_ANIMATION_PROGRESS';
export const SET_GAME_STATE = 'SET_GAME_STATE';

export function initialise() {
  const field = Array.from(Array(4)).map((n, x) => {
    return Array.from(Array(4)).map((n, i) => {
      return { type: (i + 1) * (x + 1), offsetX: 0, offsetY: 0 };
    });
  })
  const len = field.length;
  const x = Math.floor(Math.random() * len);
  const y = Math.floor(Math.random() * len);

  // field[y][x].type = 2;
  field[0][0].type = 2;

  return {
    type: INITIALISE,
    payload: { field }
  }
}

export function setField(field) {
  return {
    type: SET_FIELD,
    payload: { field }
  }
}

export function updateRenderedField(renderedField) {
  return {
    type: UPDATE_RENDERED_FIELD,
    payload: { renderedField }
  }
}

export function setMoveDirection(moveDirection) {
  return {
    type: SET_MOVE_DIRECTION,
    payload: { moveDirection }
  }
}

export function updateScore(score) {
  return {
    type: UPDATE_SCORE,
    payload: { score }
  }
}

export function setAnimationProgress(animationProgress) {
  return {
    type: SET_ANIMATION_PROGRESS,
    payload: { animationProgress: Number(animationProgress.toFixed(2)) }
  }
}

export function setGameState(game) {
  return {
    type: SET_GAME_STATE,
    payload: { game }
  }
}
