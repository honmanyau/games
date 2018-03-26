export const INITIALISE = 'INITIALISE';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const UPDATE_RENDERED_FIELD = 'UPDATE_RENDERED_FIELD';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export function initialise(field) {
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
