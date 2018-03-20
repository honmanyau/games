import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';
import styled from 'styled-components';

import { TETROMINO_MATRICIES } from './constants';
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

class GameContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const states = JSON.stringify({
      field: this.props.reactris.field,
      tetromino: this.props.reactris.tetromino,
      tetrominoY: this.props.reactris.tetrominoY,
      tetrominoX: this.props.reactris.tetrominoX
    });
    const nextStates = JSON.stringify({
      field: nextProps.reactris.field,
      tetromino: nextProps.reactris.tetromino,
      tetrominoY: nextProps.reactris.tetrominoY,
      tetrominoX: nextProps.reactris.tetrominoX
    });

    return states !== nextStates;
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleInput, false);
    this.props.subscribeToCirclet(this.update);
  }

  collisionCheck = (field, matrix, nextTetrominoX, nextTetrominoY) => {
    const fieldLengthX = field[0].length;
    const fieldLengthY = field.length;
    const matrixLength = matrix.length;
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

    return movable;
  }

  moveTetromino = (x, y) => {
    const { field, tetromino, tetrominoX, tetrominoY } = this.props.reactris;
    const matrix = TETROMINO_MATRICIES[tetromino];
    const nextTetrominoX = tetrominoX + x;
    const nextTetrominoY = tetrominoY + y;
    const drop = y > 0;
    const movable = this.collisionCheck(
      field, matrix, nextTetrominoX, nextTetrominoY
    );

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

  handleInput = (event) => {
    event.preventDefault();

    const { moveTetromino } = this;

    switch(event.key) {
      case 'ArrowDown':
        moveTetromino(0, 1);
        break;

      case 'ArrowLeft':
        moveTetromino(-1, 0);
        break;

      case 'ArrowRight':
        moveTetromino(1, 0);
        break;

      case ' ':
        break;

      default:
        break;
    }
  }

  update = (render, epsilon) => {
    const {
      targetFPS,
      incrementFrameCount,
      setFrameCount,
      generateNewTetromino,
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
        const matrix = TETROMINO_MATRICIES[tetromino];
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
      // UpdateField and updateTetrominoPosition should only be here and
      // not other functions, check else if (frameCount >= dropThreshold) block
      // above and also this.moveTetromino
      setFrameCount(frameCount - dropThreshold);
    }

    incrementFrameCount();
  }

  render() {
    const { field, tetromino, tetrominoX, tetrominoY } = this.props.reactris;
    const matrix = TETROMINO_MATRICIES[tetromino];

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
