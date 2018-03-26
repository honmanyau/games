import React from 'react';
import styled from 'styled-components';

import { MEDIA_MAX_WIDTH } from './constants';



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
  background: ${props => props.val ? '#ff8b94' : '#CCC'};
`;

const playingField = ({ field }) => {
  const flattenedField = field.join(',').split(',');
  const tiles = flattenedField.map((val, index) => {
    return <Tile key={index} val={val}>{val}</Tile>;
  });

  return(
     <Container>{tiles}</Container>
  );
}

export default playingField;
