import React from 'react';
import styled from 'styled-components';



const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  width: 30px;
  height: 30px;
  background: ${props => {
    switch(props.type) {
      case 'I':
        return '#ff8b94';

      case 'O':
        return '#ffaaa5';

      case 'T':
        return '#ffd4b7';

      case 'J':
        return '#dcedc1';

      case 'L':
        return '#a8e6cf';

      case 'S':
        return '#bae1ff';

      case 'Z':
        return '#b9bcff';

      default:
        return 'transparent';
    }
  }}
`;

const PlayingField = ({ field }) => {
  const renderedField = field.map((row, rowIndex) => {
    const cells = row.map((type, cellIndex) => {
      return <Cell key={`cell-${cellIndex}`} type={type}></Cell>;
    });

    return <Row key={`row-${rowIndex}`}>{cells}</Row>;
  });

  renderedField.shift();

  return renderedField;
}

export default PlayingField;
