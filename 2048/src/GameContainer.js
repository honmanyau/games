import React from 'react';
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';

import {
  initialise,
  updateField,
  updateRenderedField,
  updateScore,
  setGameState
} from './actions';

import PlayingField from './PlayingField';



class GameContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const renderedField = JSON.stringify(this.props.znva.renderedField);
    const nextRenderedField = JSON.stringify(nextProps.znva.renderedField);

    return nextRenderedField !== renderedField;
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleInput);
    this.props.initialise();
    this.props.subscribeToCirclet(this.update);
  }

  deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  }

  handleInput = (event) => {
    event.preventDefault();

    let x = 0;
    let y = 0;

    switch(event.key) {
      case 'ArrowUp':
        y = -1;
        break;

      case 'ArrowDown':
        y = 1;
        break;

      case 'ArrowLeft':
        x = -1;
        break;

      case 'ArrowRight':
        x = 1;
        break;

      default:
        break;
    }

    if (x || y) {
      this.moveTiles(x, y);
      this.addTile();
    }

    this.updateGameState();
  }

  addTile = () => {
    const { stringify } = JSON;
    const { updateField } = this.props;
    const { field, prevField } = this.props.znva;
    const fieldChanged = stringify(field) !== stringify(prevField);

    if (fieldChanged) {
      const nextField = this.deepClone(field);
      const len = nextField.length;
      const emptyTiles = nextField.join(',').split(',').filter((tile) => !tile);
      const fieldIsFull = emptyTiles.length === 0;

      if (fieldIsFull) {
        return 'full';
      }
      else {
        const emptyPositions = [];

        for (let y = 0; y < len; y ++) {
          for (let x = 0; x < len; x++) {
            const tile = nextField[y][x];

            if (!tile) {
              emptyPositions.push({ x, y });
            }
          }
        }

        const randomNum = Math.floor(Math.random() * emptyPositions.length);
        const { x, y } = emptyPositions[randomNum];

        nextField[y][x] = 2;

        updateField(nextField);

        return 'added';
      }
    }
  }

  rotateField = (field, direction) => {
    const size = field.length - 1;
    const rotateField = field.map((row, rowIndex) => {
      return row.map((tile, tileIndex) => {
        if (direction === 'clockwise') {
          return field[tileIndex][size - rowIndex];
        }
        if (direction === 'anticlockwise') {
          return field[size - tileIndex][rowIndex];
        }

        return row;
      });
    });

    return rotateField;
  }

  getPossibleMoves = () => {
    const { field: unrotatedField } = this.props.znva;
    const rotatedField = this.rotateField(unrotatedField, 'clockwise');
    const len = unrotatedField.length;
    const emptyTiles = unrotatedField.join(',').split(',').filter((tile) => {
      return !tile;
    });
    let possibleMoves = emptyTiles.length;

    [unrotatedField, rotatedField].forEach((field) => {
      field.forEach((row, rowIndex) => {
        const filteredRow = row.filter((tile, tileIndex) => {
          return tile !== row[tileIndex + 1]
        });

        possibleMoves += len - filteredRow.length;
      });
    });

    return possibleMoves;
  }

  moveTiles = (x, y) => {
    const { deepClone, rotateField } = this;
    const { updateField, updateScore } = this.props;
    const len = this.props.znva.field.length;
    let field = deepClone(this.props.znva.field);
    let nextField;
    let score = 0;

    if (!x && y) {
      field = rotateField(field, 'clockwise');
    }

    nextField = field.map((row, rowIndex) => {
      let tiles = row.filter((tile) => tile);

      if (x === 1 || y === 1) {
        tiles = tiles.reverse();
      }

      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        const nextTile = tiles[i + 1];

        if (tile === nextTile) {
          score += tile * 2;
          tiles[i] = tile * 2;
          tiles[i + 1] = null;
        }
      }

      tiles = tiles.filter((tile) => tile);

      const spaces = Array.from(Array(len - tiles.length));
      const nextRow = [...tiles, ...spaces];

      return (x === 1 || y === 1) ? nextRow.reverse() : nextRow;
    });

    if (!x && y) {
      nextField = rotateField(nextField, 'anticlockwise');
    }

    if (score) {
      updateScore(score);
    }

    updateField(nextField);
  }

  updateGameState = () => {
    const { game } = this.props.znva;

    if (game !== 'over') {
      const possibleMoves = this.getPossibleMoves();

      if (!possibleMoves) {
        this.props.setGameState('over');
      }
    }
  }

  update = (render, epsilon) => {
    if (render) {
      const { field } = this.props.znva;

      this.props.updateRenderedField(field);
    }
  }

  render() {
    const { field, game } = this.props.znva;

    return (
      <PlayingField field={field} />
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
    initialise: () => dispatch(initialise()),
    updateField: (field) => dispatch(updateField(field)),
    updateRenderedField: (field) => dispatch(updateRenderedField(field)),
    updateScore: (score) => dispatch(updateScore(score)),
    setGameState: (game) => dispatch(setGameState(game))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
