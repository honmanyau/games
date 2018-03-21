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
  updateMatrix,
  unsetTetromino,
  setCombinedField
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
    const combinedField = JSON.stringify(this.props.flatris.combinedField);
    const nextcombinedField = JSON.stringify(nextProps.flatris.combinedField);

    return combinedField !== nextcombinedField;
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
      const nextCellY = nextTetrominoY + r;

      if (rowIsEmpty) {
        continue;
      }
      else {
        if (nextCellY >= fieldLengthY) {
          outOfBounds = true;
          break;
        }

        for (let c = 0; c < matrixLength; c++) {
          const cell = matrix[r][c];
          const nextCellX = nextTetrominoX + c;

          outOfBounds = outOfBounds || (
            cell && (
              (nextCellX < 0)
              || (nextCellX >= fieldLengthX)
              || (nextCellY >= fieldLengthY)
            )
          );

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
    }

    const movable = !collided && !outOfBounds;

    return movable;
  }

  moveTetromino = (x, y) => {
    const { updateField, unsetTetromino } = this.props;
    const { field, tetrominoX, tetrominoY, matrix } = this.props.flatris;
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
        const newField = JSON.parse(JSON.stringify(field));
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

        return 'cemented';
      }
      else {
        return 'unmoved';
      }
    }
  }

  rotateTetromino = () => {
    const { field, tetrominoX, tetrominoY, matrix } = this.props.flatris;
    const size = matrix.length - 1;
    const rotatedMatrix = matrix.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        return matrix[cellIndex][size - rowIndex]
      });
    });
    const rotatable = this.collisionCheck(
      field, rotatedMatrix, tetrominoX, tetrominoY
    );

    if (rotatable) {
      this.props.updateMatrix(rotatedMatrix);

      return 'rotated';
    }
    else {
      return 'unrotated';
    }
  }

  destroyRows = () => {
    const { combinedField } = this.props.flatris;
    const len = combinedField.length;
    const field = JSON.parse(JSON.stringify(combinedField));
    let rowsCleared = 0;

    for (let rowIndex = len - 1; rowIndex >= 0; rowIndex--) {
      const row = field[rowIndex];
      const rowFilled = row.reduce((acc, cell) => acc && cell, true);

      if (rowFilled) {
        field.splice(rowIndex, 1);
        rowsCleared++;
      }
    }

    if (rowsCleared) {
      for (let i = 0; i < rowsCleared; i++) {
        field.unshift(Array.from(Array(10)));
      }
    }

    this.props.updateField(field);

    return rowsCleared;
  }

  handleInput = (event) => {
    event.preventDefault();

    const { moveTetromino, rotateTetromino } = this;
    const { tetromino } = this.props.flatris;

    if (tetromino) {
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
          rotateTetromino();
          break;

        default:
          break;
      }
    }
  }

  getCombinedField = () => {
    const { field, tetrominoX, tetrominoY, matrix } = this.props.flatris;
    const combinedField = JSON.parse(JSON.stringify(field));

    if (matrix) {
      matrix.forEach((row, rowIndex) => {
        const rowIsEmpty = row.reduce((acc, cell) => acc && !cell, true);

        row.forEach((cell, cellIndex) => {
          const fieldY = tetrominoY + rowIndex;
          const fieldX = tetrominoX + cellIndex;

          if (!rowIsEmpty && cell) {
            combinedField[fieldY][fieldX] = cell;
          }
        });
      })
    }

    return combinedField;
  }

  update = (render, epsilon) => {
    const {
      targetFPS,
      incrementFrameCount,
      setFrameCount,
      generateNewTetromino
    } = this.props;
    const { speed, frameCount, tetromino } = this.props.flatris;
    const dropThreshold = speed / 1000 * targetFPS;

    if (!tetromino) {
      const rowsCleared = this.destroyRows();
      // this.checkRows(); use a flag to see if field is updated before
      // generating a new tetromino
      if (!rowsCleared) {
        generateNewTetromino();
      }
    }
    else if (frameCount >= dropThreshold) {
      this.moveTetromino(0, 1);
      setFrameCount(frameCount - dropThreshold);
    }

    if (render) {
      const combinedField = this.getCombinedField();

      this.props.setCombinedField(combinedField);
    }

    incrementFrameCount();
  }

  render() {
    const { combinedField } = this.props.flatris;

    return (
      <Container>
        <PlayingField field={combinedField} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    targetFPS: state.circlet.targetFPS,
    flatris: state.flatris
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeToCirclet: (fn) => dispatch(subscribeToCirclet(fn)),
    incrementFrameCount: () => dispatch(incrementFrameCount()),
    setFrameCount: (frameCount) => dispatch(setFrameCount(frameCount)),
    updateField: (field) => dispatch(updateField(field)),
    generateNewTetromino: () => dispatch(generateNewTetromino()),
    updateTetrominoPosition: (x, y) => dispatch(updateTetrominoPosition(x, y)),
    updateMatrix: (matrix) => dispatch(updateMatrix(matrix)),
    unsetTetromino: () => dispatch(unsetTetromino()),
    setCombinedField: (field) => dispatch(setCombinedField(field))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
