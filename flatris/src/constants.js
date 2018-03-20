const x = null;
const I = 'I';
const O = 'O';
const T = 'T';
const J = 'J';
const L = 'L';
const S = 'S';
const Z = 'Z';

export const TETROMINO_MATRICIES = {
  I: [
    [x, x, x, x],
    [I, I, I, I],
    [x, x, x, x],
    [x, x, x, x]
  ],
  O: [
    [x, x, x, x],
    [x, O, O, x],
    [x, O, O, x],
    [x, x, x, x]
  ],
  T: [
    [x, x, x],
    [T, T, T],
    [x, T, x]
  ],
  J: [
    [x, x, x],
    [J, J, J],
    [x, x, J]
  ],
  L: [
    [x, x, x],
    [L, L, L],
    [L, x, x]
  ],
  S: [
    [x, x, x],
    [x, S, S],
    [S, S, x]
  ],
  Z: [
    [x, x, x],
    [Z, Z, x],
    [x, Z, Z]
  ]
};
