import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';
import styled from 'styled-components';

import { incrementFrameCount, resetFrameCount, updateField } from './actions';

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
    const targetFPS = 60;
    const { incrementFrameCount, resetFrameCount } = this.props;
    const { speed, frameCount } = this.props.reactris;
    const dropThreshold = speed / 1000 * targetFPS;

    if (frameCount >= dropThreshold) {
      // tetrominoY + 1;
    }

    if (render && frameCount >= dropThreshold) {
      this.draw();
      resetFrameCount(frameCount % dropThreshold);
    }

    incrementFrameCount();
  }

  draw = () => {
    const { field, tetromino, tetrominoX, tetrominoY } = this.props.reactris;
    const newField = field;

    updateField(newField);
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
    reactris: state.reactris
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeToCirclet: (fn) => dispatch(subscribeToCirclet(fn)),
    incrementFrameCount: () => dispatch(incrementFrameCount()),
    resetFrameCount: (frameCount) => dispatch(resetFrameCount(frameCount)),
    updateField: (field) => dispatch(updateField(field))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
