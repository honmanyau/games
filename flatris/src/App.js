import React, { Component } from 'react';
import styled from 'styled-components';

import GameContainer from './GameContainer';
import UIContainer from './UIContainer';



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameArea = styled.div`
  display: flex;
  flex-basis: content;
  border: 5px solid white;
  border-radius: 2px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

class App extends Component {
  render() {
    return (
      <Container>
        <GameArea>
          <GameContainer />
          <UIContainer />
        </GameArea>
      </Container>
    );
  }
}

export default App;
