import React from 'react';
import styled from 'styled-components';

import { MEDIA_MAX_WIDTH } from './constants';



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

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 5px;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  grid-gap: 5px;
  box-sizing: border-box;
`;

const Tile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 32px;
  color: white;
  background: ${props => props.val ? props.colour : '#CCC'};
`;

const playingField = ({ field }) => {
  const flattenedField = field.join(',').split(',');
  const tiles = flattenedField.map((val, index) => {
    const num = Number(val);
    const colour = num > 2048 ? '#ff8b94' : COLOURS[NUMBERS.indexOf(num)];

    return <Tile key={index} val={val} colour={colour}>{val}</Tile>;
  });

  return(
     <Container>{tiles}</Container>
  );
}

export default playingField;
