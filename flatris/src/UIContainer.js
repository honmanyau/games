import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';



const Container = styled.div`
  width: 150px;
  margin-left: 5px;
  line-height: 1.6;
`;

const Lines = styled.div`
  margin-bottom: 20px;
  padding: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5) inset;
  text-align: center;
`;

const Status = styled.div`
  text-align: center;
  padding: 80px 0;
`;

const Control = styled.code`
  padding: 0 4px;
  flex-basis: content;
  border: 1px solid black;
  border-radius: 2px;
  font-size: 1.2em;
`;

class UIContainer extends Component {
  render() {
    const { game } = this.props;
    let status = ' ';

    switch(game) {
      case 'paused':
        status = '--PAUSED--';
        break;

      case 'over':
        status = '--GAME OVER--';
        break;

      default:
        status = ' ';
        break;
    }

    return (
      <Container>
        <Lines>
          <div>Lines Cleared</div>
          <div>{0}</div>
        </Lines>
        <Status>{status}</Status>
        <div><Control>↓</Control> down</div>
        <div><Control>←</Control> left</div>
        <div><Control>→</Control> right</div>
        <div><Control>spacebar</Control> rotate</div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.flatris.game
  }
}

export default connect(mapStateToProps, null)(UIContainer);
