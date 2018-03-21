import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import GameContainer from './GameContainer';



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  render() {
    const { game } = this.props;

    return (
      <Container>
        <GameContainer />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.flatris.game
  }
}

export default connect(mapStateToProps, null)(App);
