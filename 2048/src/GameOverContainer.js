import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { initialise } from './actions';



const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  width: 50%;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  font-size: 24px;
  line-height: 1.618;
  font-variant: small-caps;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
`;

const Restart = styled.span`
  font-size: 18px;
  text-decoration: underline;
  color: #1CE;

  &:hover {
    cursor: pointer;
  }
`;

class GameOverContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { game } = this.props.znva;
    const { game: nextGame } = nextProps.znva;

    return game !== nextGame;
  }

  render() {
    const { initialise } = this.props;
    const { game } = this.props.znva;

    if (game === 'over') {
      return(
        <Container>
          <Message>
            <div>game over</div>
            <div onClick={initialise} onTouchStart={initialise}>
              <Restart>restart</Restart>
            </div>
          </Message>
        </Container>
      );
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    znva: state.znva
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialise: () => dispatch(initialise())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOverContainer);
