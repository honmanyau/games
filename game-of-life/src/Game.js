import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { subscribeToCirclet } from 'circlet';
import { initialise } from './actions';



const Container = styled.div`
  background: black;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.8);
`;

class Game extends React.Component {
  componentDidMount() {
    // Props passed from parent component
    const { cellWidth, cellHeight, alpha } = this.props;
    // Action creators
    const { entwickeln, subscribeToCirclet } = this.props;

    entwickeln.init(cellWidth, cellHeight, alpha);
    subscribeToCirclet(this.update);
  }

  update = () => {

  }

  render() {
    return (
      <Container>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gol: state.gol
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    entwickeln: {
      init: (w, h, a) => dispatch(initialise(w, h, a))
    },
    subscribeToCirclet: (fn) => dispatch(subscribeToCirclet(fn))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
