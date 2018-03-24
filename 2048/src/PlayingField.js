import React from 'react';
import styled from 'styled-components';



const Container = styled.div`
  width: 400px;
  height: 400px;
  padding: 5px;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  grid-gap: 5px;
  box-sizing: border-box;

  @media (max-width: 399px) {
    width: 100vw;
    height: 100vw;
  }
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed black;
  border-radius: 4px;
`;

const playingField = ({ field }) => {
  const flattenedField = field.join(',').split(',');
  const cells = flattenedField.map((val, index) => {
    return <Cell key={index}>{val}</Cell>;
  });

  return(
     <Container>{cells}</Container>
  );
}

export default playingField;
