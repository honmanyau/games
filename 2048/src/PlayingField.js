import React from 'react';
import styled from 'styled-components';

import { MEDIA_MAX_WIDTH } from './constants';



const Container = styled.div`
  width: 400px;
  height: 400px;
  padding: 5px;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  grid-gap: 5px;
  box-sizing: border-box;

  @media (max-width: ${MEDIA_MAX_WIDTH}px) {
    width: 100vw;
    height: 100vw;
  }
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
  const cells = flattenedField.map((val, index) => {
    return <Tile key={index} val={val}>{val}</Tile>;
  });

  return(
     <Container>{cells}</Container>
  );
}

export default playingField;
