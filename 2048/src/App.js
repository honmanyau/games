import React from 'react';
import styled from 'styled-components';

import { MEDIA_MAX_WIDTH } from './constants';

import GameContainer from './GameContainer';
import UIContainer from './UIContainer';


const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 50px 1fr 1fr;
  justify-content: center;
`;

const GridItem = styled.div`
  grid-row: ${props => props.row};
  grid-column: ${props => props.column};
`;

class App extends React.Component {
  render() {
    return (
      <Container>
        <GridItem row="2"><UIContainer /></GridItem>
        <GridItem row="3"><GameContainer /></GridItem>
      </Container>
    );
  }
}

export default App;
