import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';
import styled from 'styled-components';

import {
  incrementFrameCount,
  setFrameCount,
  updateField,
  generateNewTetromino,
  updateTetrominoPosition
} from './actions';

import PlayingField from './PlayingField';



const Container = styled.div`
  border: 1px dashed crimson;

  & > * {
    box-sizing: border-box;
  }
`;

class GameContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const fieldString = JSON.stringify(this.props.reactris.field);
    const nextFieldString = JSON.stringify(nextProps.reactris.field);

    return fieldString !== nextFieldString;
  }

  componentDidMount() {
    this.props.subscribeToCirclet(this.update);
  }

  update = (render, epsilon) => {
    const {
      targetFPS,
      incrementFrameCount,
      setFrameCount,
      generateNewTetromino,
      updateTetrominoPosition
    } = this.props;
    const {
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
      // Drop tetromino
      updateTetrominoPosition(tetrominoX, tetrominoY + 1);
      setFrameCount(0);
    }

    if (render && frameCount >= dropThreshold) {
      this.draw();
      setFrameCount(frameCount - 60);
    }

    incrementFrameCount();
  }

  draw = () => {
    const { field, tetromino, tetrominoX, tetrominoY } = this.props.reactris;
    const newField = field;
    
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
    generateNewTetromino: () => dispatch(generateNewTetromino())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
