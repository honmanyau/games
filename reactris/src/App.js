import React, { Component } from 'react';
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
    return (
      <Container>
        <GameContainer />
      </Container>
    );
  }
}

export default App;
