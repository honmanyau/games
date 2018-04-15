import entwickeln from 'entwickeln';



export const INITIALISE = 'INITIALISE';

export function initialise(width, height, alpha = 0.25) {
  const game = entwickeln.init(width, height, alpha);

  return {
    type: INITIALISE,
    payload: { game }
  }
}
