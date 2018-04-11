import React from 'react';
import styled from 'styled-components';



const GRID_GAP = 5;

const COLOURS = [
  '#b9bcff',
  '#bae1ff',
  '#a8e6cf', '#c2e9c8',
  '#dcedc1', '#ede0bc',
  '#ffd4b7', '#ffbfae',
  '#ffaaa5', '#ff9a9c',
  '#ff8b94'
];

const NUMBERS = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];

const Container  = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 4px;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  grid-gap: ${GRID_GAP}px;
  box-sizing: border-box;
  overflow: visible;
`;

const Tiles = Background.extend``;

const Tile = styled.div.attrs({
  style: props => ({
    transform: `translate(
      ${props.translateX}px,
      ${props.translateY}px
    )`
  })
})`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${GRID_GAP}px;
  font-family: sans-serif;
  font-size: 32px;
  color: white;
  background: ${props => props.num ? props.colour : '#CCC'};
`;

const backgroundArray = Array.from(Array(4)).map(() => Array.from(Array(4)));
const backgroundTiles = backgroundArray.map((row, rowIndex) => {
  return row.map((tile, tileIndex) => {
    return <Tile key={tileIndex} />;
  })
});

const playingField = ({ field, animationProgress }) => {
  const width = Math.min(400, window.innerWidth);
  const animationWidth = (width - GRID_GAP * 5) / 4 + GRID_GAP;
  const flattenedField = field.reduce((acc, row) => {
    return acc.concat(row);
  }, []);
  const tiles = flattenedField.map((obj, index) => {
    const { type, offsetX, offsetY } = obj;
    const num = Number(type);
    const colour = num > 2048 ? '#ff8b94' : COLOURS[NUMBERS.indexOf(num)];

    if (!type) {
      return <div key={index}></div>;
    }
    else {
      return(
        <Tile
          key={index}
          num={num}
          colour={colour}
          translateX={offsetX * animationProgress * animationWidth}
          translateY={offsetY * animationProgress * animationWidth}
        >
          {type}
        </Tile>
      );
    }
  });

  return(
    <Container>
      <Background>{backgroundTiles}</Background>
      <Tiles>{tiles}</Tiles>
    </Container>
  );
}

export default playingField;
