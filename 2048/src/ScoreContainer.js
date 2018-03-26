import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';



const Container = styled.div`
  margin: 10px 0;
  text-align: center;
  font-size: 24px;
  line-height: 1.618;
  font-variant: small-caps;
  color: #333;
`;

class ScoreContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { score } = this.props.znva;
    const { score: nextScore } = nextProps.znva;

    return score !== nextScore;
  }

  render() {
    const { score } = this.props.znva;

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

export default connect(mapStateToProps, null)(ScoreContainer);
