import React from 'react';
import styled from 'styled-components';

import Game from './Game';



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
        <Game cellWidth={50} cellHeight={30} />
      </Container>
    );
  }
}

export default App;
