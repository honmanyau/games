const initialState = {
  field: Array.from(Array(20)).map(() => Array.from(Array(10))),
  tetromino: null,
  playerX: 3,
  playerY: 0
};

export default function reactris(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
