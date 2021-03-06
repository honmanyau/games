import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { restart } from './actions';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  padding: 60px 0;
`;

const Key = styled.code`
  flex-basis: content;
  padding: 0 4px;
  border: 1px solid black;
  border-radius: 2px;
  font-size: 1.2em;
`;

const Restart = styled.strong`
  font-weight: bold;
  font-size: 14px;
  text-decoration: underline;
  transition: color 1s;

  &:hover {
    color: #1CE;
    cursor: pointer;
  }
`;

class UIContainer extends Component {
  render() {
    const { game, lines } = this.props;
    let status = ' ';
    let restart = null;

    switch(game) {
      case 'paused':
        status = '--PAUSED--';
        break;

      case 'over':
        status = '--GAME OVER--';
        restart = <Restart onClick={this.props.restart}>Restart</Restart>
        break;

      default:
        status = ' ';
        break;
    }

    return (
      <Container>
        <Lines>
          <div>Lines Cleared</div>
          <div>{lines}</div>
        </Lines>

        <Status>
          <div>{status}</div>
          <div>{restart}</div>
        </Status>

        <div>
          <div>
            <Key>↓</Key>
            <br />
            Down
          </div>

          <div>
            <Key>←</Key>
            <br />
            Left
          </div>

          <div>
            <Key>→</Key>
            <br />
            Right
          </div>

          <div>
            <Key>Spacebar</Key> <Key>C</Key>
            <br />
            Rotate
          </div>

          <div>
            <Key>P</Key> <Key>Z</Key>
            <br />
            Pause
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.flatris.game,
    lines: state.flatris.lines
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    restart: () => dispatch(restart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UIContainer);
