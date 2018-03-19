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
    [x, S, S],
    [S, S, x],
    [x, x, x]
  ],
  Z: [
    [x, x, x],
    [Z, Z, x],
    [x, Z, Z]
  ]
};

class GameContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const fieldString = JSON.stringify(this.props.reactris.field);
    const nextFieldString = JSON.stringify(nextProps.reactris.field);

    return fieldString !== nextFieldString;
  }

  componentDidMount() {
    this.props.subscribeToCirclet(this.update);
  }

  moveTetromino = () => {
    const { tetrominoX, tetrominoY } = this.props.reactris;

    this.props.updateTetrominoPosition(tetrominoX, tetrominoY + 1);
  }

  update = (render, epsilon) => {
    const {
      targetFPS,
      incrementFrameCount,
      setFrameCount,
      generateNewTetromino,
      updateTetrominoPosition,
      updateField
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
      this.moveTetromino();
      setFrameCount(0);
    }

    if (render && frameCount >= dropThreshold) {
      this.draw();
      setFrameCount(frameCount - dropThreshold);
    }

    incrementFrameCount();
  }

  draw = () => {
    const { field, tetromino, tetrominoX, tetrominoY } = this.props.reactris;
    const newField = JSON.parse(JSON.stringify(field));
    console.log(tetrominoX, tetrominoY, tetromino, tetrominoMatricies[tetromino])

    tetrominoMatricies[tetromino].forEach((row, rowIndex) => {
      row.forEach((type, cellIndex) => {
        newField[tetrominoY + rowIndex][tetrominoX + cellIndex] = type;
      });
    });

    this.props.updateField(newField);
  }

  render() {
    return (
      <Container>
        <PlayingField field={this.props.reactris.field} />
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
