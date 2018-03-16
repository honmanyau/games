import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';
import styled from 'styled-components';



class PlayingField extends Component {
  render() {
    // console.log(this.props.reactris);
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reactris: state.reactris
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeToCirclet: (fn) => dispatch(subscribeToCirclet(fn))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayingField);
