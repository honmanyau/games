import React from 'react';
import styled from 'styled-components';

import { MEDIA_MAX_WIDTH } from './constants';

import GameContainer from './GameContainer';
import ScoreContainer from './ScoreContainer';
import GameOverContainer from './GameOverContainer';



const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 50px 1fr 1fr 60px;
  justify-content: center;
  align-items: center;

  @media
    screen and (max-width: ${MEDIA_MAX_WIDTH}px) and (orientation: portrait) {
      grid-template-rows: 1fr 50px 1fr 2fr 60px;
    }
`;

const GridItem = styled.div`
  grid-row: ${props => props.row};
  grid-column: ${props => props.column};
`;

const GameGrid = GridItem.extend`
  width: 400px;
  height: 400px;
  position: relative;

  @media
    screen and (max-width: ${MEDIA_MAX_WIDTH}px) and (orientation: portrait) {
      width: 100vw;
      height: 100vw;
    }
`;

class App extends React.Component {
  render() {
    return (
      <Container>
        <GridItem row="2"><ScoreContainer /></GridItem>
        <GameGrid row="3">
          <GameContainer />
          <GameOverContainer />
        </GameGrid>
      </Container>
    );
  }
}

export default App;
