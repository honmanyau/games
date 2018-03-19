import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';
import styled from 'styled-components';

import { incrementFrameCount, resetFrameCount, updateField } from './actions';



const Container = styled.div`
  border: 1px dashed crimson;

  & > * {
    box-sizing: border-box;
  }
`;

const Row  = styled.div`
  display: flex;
`;

const Cell = styled.div`
  width: 30px;
  height: 30px;
  background: ${props => {
    switch(props.type) {
      case 'I':
        return '#ff8b94';

      case 'O':
        return '#ffaaa5';

      case 'T':
        return '#ffd4b7';

      case 'J':
        return '#dcedc1';

      case 'L':
        return '#a8e6cf';

      case 'S':
        return '#bae1ff';

      case 'Z':
        return '#b9bcff';

      default:
        return 'black';
    }
  }}
`;

class PlayingField extends Component {
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

  getRenderedField = (field) => {
    const renderedField = field.map((row, rowIndex) => {
      const cells = row.map((type, cellIndex) => {
        return <Cell key={`cell-${cellIndex}`} type={type}></Cell>;
      });

      return <Row key={`row-${rowIndex}`}>{cells}</Row>;
    });

    return renderedField;
  }

  render() {
    const renderedField = this.getRenderedField(this.props.reactris.field);

    return (
      <Container>
        {renderedField}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayingField);
