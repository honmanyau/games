import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';
import styled from 'styled-components';

import {
  incrementFrameCount,
  setFrameCount,
  updateField,
  generateNewTetromino,
  updateTetrominoPosition,
  unsetTetromino
} from './actions';

import PlayingField from './PlayingField';



const Container = styled.div`
  border: 1px dashed crimson;
  background: black;

  & > * {
    box-sizing: border-box;
  }
`;

const x = null;
const I = 'I';
const O = 'O';
const T = 'T';
const J = 'J';
const L = 'L';
const S = 'S';
const Z = 'Z';

const tetrominoMatricies = {
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

class GameContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const {
      field,
      tetromino,
      tetrominoY,
      tetrominoX
    } = this.props.reactris;
    const {
      field: nextField,
      tetromino: nextTetromino,
      tetrominoY: nextTetrominoY,
      tetrominoX: nextTetrominoX
    } = nextProps.reactris;
    const states = JSON.stringify({
      field,
      tetromino,
      tetrominoY,
      tetrominoX
    });
    const nextStates = JSON.stringify({
      field: nextField,
      tetromino: nextTetromino,
      tetrominoY: nextTetrominoY,
      tetrominoX: nextTetrominoX
    });

    return states !== nextStates;
  }

  componentDidMount() {
    this.props.subscribeToCirclet(this.update);
  }

  moveTetromino = (x, y) => {
    const { field, tetromino, tetrominoX, tetrominoY } = this.props.reactris;
    const fieldLengthX = field[0].length;
    const fieldLengthY = field.length;
    const matrix = tetrominoMatricies[tetromino];
    const matrixLength = matrix.length;
    const nextTetrominoX = tetrominoX + x;
    const nextTetrominoY = tetrominoY + y;
    const drop = y > 0;
    let collided = false;
    let outOfBounds = false;

    for (let r = matrixLength - 1; r >= 0 && !collided && !outOfBounds; r--) {
      const row = matrix[r];
      const rowIsEmpty = row.reduce((acc, cell) => acc && !cell, true);

      if (rowIsEmpty) {
        continue;
      }

      for (let c = 0; c < matrixLength; c++) {
        const cell = matrix[r][c];
        const nextCellY = nextTetrominoY + r;
        const nextCellX = nextTetrominoX + c;

        outOfBounds = outOfBounds
          || (nextCellX < 0)
          || (nextCellX >= fieldLengthX)
          || (nextCellY >= fieldLengthY);

        if (outOfBounds) {
          break;
        }

        const nextCell = field[nextCellY][nextCellX];

        collided = collided || (cell && nextCell);

        if (collided) {
          break;
        }
      }
    }

    const movable = !collided && !outOfBounds;

    if (movable) {
      this.props.updateTetrominoPosition(nextTetrominoX, nextTetrominoY);
      return 'moved';
    }
    else {
      if (drop) {
        return 'cemented';
      }
      else {
        return 'unmoved';
      }
    }
  }

  update = (render, epsilon) => {
    const {
      targetFPS,
      incrementFrameCount,
      setFrameCount,
      generateNewTetromino,
      updateTetrominoPosition,
      updateField,
      unsetTetromino
    } = this.props;
    const {
      field,
      speed,
      frameCount,
      tetromino,
      tetrominoX,
      tetrominoY
    } = this.props.reactris;
    const dropThreshold = speed / 1000 * targetFPS;

    if (!tetromino) {
      generateNewTetromino();
    }
    else if (frameCount >= dropThreshold) {
      const moveResult = this.moveTetromino(0, 1);

      if (moveResult === 'cemented') {
        const newField = JSON.parse(JSON.stringify(field));
        const matrix = tetrominoMatricies[tetromino];
        const matrixLength = matrix.length;

        for (let r = 0; r < matrixLength; r++) {
          for (let c = 0; c < matrixLength; c++) {
            const cell = matrix[r][c];

            if (cell) {
              newField[tetrominoY + r][tetrominoX + c] = cell;
            }
          }
        }

        updateField(newField);
        unsetTetromino();
      }

      setFrameCount(0);
    }

    if (render && frameCount >= dropThreshold) {
      setFrameCount(frameCount - dropThreshold);
    }

    incrementFrameCount();
  }

  draw = () => {

  }

  render() {
    const { field, tetromino, tetrominoX, tetrominoY } = this.props.reactris;
    const matrix = tetrominoMatricies[tetromino];

    return (
      <Container>
        <PlayingField
          field={field}
          matrix={matrix}
          tetrominoY={tetrominoY}
          tetrominoX={tetrominoX}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    targetFPS: state.circlet.targetFPS,
    reactris: state.reactris
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeToCirclet: (fn) => dispatch(subscribeToCirclet(fn)),
    incrementFrameCount: () => dispatch(incrementFrameCount()),
    setFrameCount: (frameCount) => dispatch(setFrameCount(frameCount)),
    updateField: (field) => dispatch(updateField(field)),
    updateTetrominoPosition: (x, y) => dispatch(updateTetrominoPosition(x, y)),
    generateNewTetromino: () => dispatch(generateNewTetromino()),
    unsetTetromino: () => dispatch(unsetTetromino())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
