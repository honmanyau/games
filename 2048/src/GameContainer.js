import React from 'react';
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';

import { initialise } from './actions';

import PlayingField from './PlayingField';



class GameContainer extends React.Component {
  componentDidMount() {
    this.init();
    this.props.subscribeToCirclet(this.update);
  }

  init = () => {
    const field = Array.from(Array(4)).map(() => Array.from(Array(4)));
    const fieldX = Math.floor(Math.random() * 4);
    const fieldY = Math.floor(Math.random() * 4);

    field[fieldY][fieldX] = 2;

    this.props.initialise(field);
  }

  update = () => {

  }

  render() {
    const { field } = this.props.znva;
    
    return (
      <div>
        <PlayingField field={field} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    znva: state.znva
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeToCirclet: (fn) => dispatch(subscribeToCirclet(fn)),
    initialise: (field) => dispatch(initialise(field))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
