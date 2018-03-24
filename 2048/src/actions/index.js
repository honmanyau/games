export const INITIALISE = 'INITIALISE';
export const UPDATE_FIELD = 'UPDATE_FIELD';

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
