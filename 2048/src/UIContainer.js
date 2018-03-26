import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';



const Container = styled.div`
  margin: 20px 0;
  font-size: 24px;
  color: #333;
  font-variant: small-caps;
`;

class UIContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { score, game } = this.props.znva;
    const { score: nextScore, game: nextGame } = nextProps.znva;

    return score !== nextScore || game !== nextGame;
  }

  render() {
    const { score, game } = this.props.znva;

    return (
      <Container>SCORE: {score}</Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    znva: state.znva
  }
}

export default connect(mapStateToProps, null)(UIContainer);
