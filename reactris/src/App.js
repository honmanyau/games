import React, { Component } from 'react';
import styled from 'styled-components';

import PlayingField from './PlayingField';



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
        <PlayingField />
      </Container>
    );
  }
}

export default App;
