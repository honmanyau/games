import React from 'react';
import styled from 'styled-components';

import { MEDIA_MAX_WIDTH } from './constants';

import GameContainer from './GameContainer';
import UIContainer from './UIContainer';


const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class App extends React.Component {
  render() {
    return (
      <Container>
        <UIContainer />
        <GameContainer />
      </Container>
    );
  }
}

export default App;
