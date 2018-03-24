import React from 'react';
import styled from 'styled-components';

import GameContainer from './GameContainer';
// import UIContainer from './UIContainer';



const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends React.Component {
  render() {
    return (
      <Container>
        <GameContainer />
      </Container>
    );
  }
}

export default App;
