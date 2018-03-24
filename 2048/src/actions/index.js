export const INITIALISE = 'INITIALISE';

export function initialise(field) {
  return {
    type: INITIALISE,
    payload: { field }
  }
}
