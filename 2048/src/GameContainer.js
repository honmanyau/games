import React from 'react';
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';

import {
  initialise,
  setField,
  updateRenderedField,
  setMoveDirection,
  updateScore,
  setAnimationProgress,
  setGameState,
} from './actions';

import PlayingField from './PlayingField';



const ANIMATION_STEP_SIZE = 0.25;

class GameContainer extends React.Component {
  constructor(props) {
    super(props);

    this.targetField = null;
    this.animationField = null;
    this.touchStartPos = null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { znva } = this.props;
    const { znva: nextZnva } = nextProps;
    const { animationProgress } = znva;
    const { animationProgress: nextAnimationProgress } = nextZnva;
    const renderedField = JSON.stringify(znva.renderedField);
    const nextRenderedField = JSON.stringify(nextZnva.renderedField);
    const animating = animationProgress !== nextAnimationProgress;
    const fieldChanged = nextRenderedField !== renderedField;

    return fieldChanged || animating;
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeypress);
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('keypress', this.handleKeypress);
      window.removeEventListener('touchstart', this.handleTouchStart);
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleTouchEnd);
    });
    this.props.initialise();
    this.props.subscribeToCirclet(this.update);
  }

  deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  }

  handleKeypress = (event) => {
    event.preventDefault();

    const { key } = event;
    let x = 0;
    let y = 0;

    switch(key) {
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

    if (!this.props.znva.moveDirection) {
      this.props.setMoveDirection({ x, y });
    }
  }

  handleTouchStart = (event) => {
    event.preventDefault();

    const touch = event.changedTouches[0];
    const { pageX, pageY } = touch;

    this.touchStartPos = { x: pageX, y: pageY };
  }

  handleTouchMove = (event) => {
    event.preventDefault();
  }

  handleTouchEnd = (event) => {
    event.preventDefault();

    const touch = event.changedTouches[0];
    const { pageX, pageY } = touch;
    const { x: startX, y: startY } = this.touchStartPos;
    const deltaX = pageX - startX;
    const deltaY = pageY - startY;
    const magnitudeX = Math.abs(deltaX);
    const magnitudeY = Math.abs(deltaY);
    const validSwipe = (magnitudeX > 25) || (magnitudeY > 25);

    if (validSwipe) {
      const move = { x: 0, y: 0 };
      const isHorizontalMove = magnitudeX > magnitudeY;

      if (isHorizontalMove) {
        move.x = deltaX / magnitudeX;
      }
      else {
        move.y = deltaY / magnitudeY;
      }

      this.props.setMoveDirection(move);
    }
  }

  addTile = (field) => {
    const emptyPositions = [];

    field.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        const { type } = tile;

        if (!type) {
          emptyPositions.push({ x: tileIndex, y: rowIndex });
        }
      });
    });

    const numOfPos = emptyPositions.length;

    if (numOfPos) {
      const randomPos = emptyPositions[Math.floor(Math.random() * numOfPos)];

      field[randomPos.y][randomPos.x].type = 2;
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

  gameOverCheck = () => {
    const { field } = this.props.znva;
    const len = field.length;
    const lastPos = len - 1;
    let possibleMoves = 0; // This is not actually all the possible moves

    for (let y = 0; y < len && !possibleMoves; y++) {
      for (let x = 0; x < lastPos && !possibleMoves; x++) {
        const tile = field[y][x];
        const { type } = tile;

        if (!type) {
          possibleMoves += 2;
        }
        else {
          const rightTile = field[y][x + 1];
          const bottomTile = (field[y + 1] || [])[x] || { type: '-' };
          const { type: rightType } = rightTile;
          const { type: bottomType } = bottomTile;

          possibleMoves += (!rightType) + (!bottomType)
            + (type === rightType) + (type === bottomType);
        }
      }
    }

    if (!possibleMoves) {
      console.log('Game over!');
      this.props.setGameState('over');
    }
  }

  calculateFields = () => {
    const { deepClone, rotateField } = this;
    const { moveDirection, field } = this.props.znva;
    const len = field.length;
    const { x: dx, y: dy } = moveDirection;
    const shouldRotate = (!dx && dy);
    const shouldReverse = (dx || dy) > 0;
    const animationField = deepClone(field);
    let targetField = deepClone(field);
    let moves = 0;

    if (shouldRotate) {
      targetField = rotateField(targetField, 'clockwise');
    }

    targetField = targetField.map((row, rowIndex) => {
      let nextRow = deepClone(row);

      nextRow = (shouldReverse) ? nextRow.reverse() : nextRow;
      nextRow = nextRow.filter((tile) => tile.type);

      for (let i = 0, lastPos = nextRow.length - 1; i < lastPos; i++) {
        const { type } = nextRow[i];
        const { type: nextType } = nextRow[i + 1];

        if (type === nextType) {
          const newType = type * 2;

          nextRow[i].type = null;
          nextRow[i + 1].type = newType;
          this.props.updateScore(newType);
        }
      }

      nextRow = nextRow.filter((tile) => tile.type);
      nextRow = nextRow.concat(
        Array.from(Array(len - nextRow.length)).map(() => (
          { type: null, offsetX: 0, offsetY: 0 }
        ))
      );

      nextRow = (shouldReverse) ? nextRow.reverse() : nextRow;

      return nextRow;
    });

    if (shouldRotate) {
      targetField = rotateField(targetField, 'anticlockwise');
    }

    animationField.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        const { type } = tile;

        if (type) {
          if (dx) {
            for (let i = tileIndex; i >= 0 && i < len; i += (dx) ) {
              const { type: targetType } = (
                (targetField[rowIndex] || [])[i] || { type: '-' }
              );

              if (!targetType) {
                tile.offsetX += dx;
                moves += Math.abs(dx);
              }
              else {
                break;
              }
            }
          }
          else if (dy) {
            for (let i = rowIndex; i >= 0 && i < len; i += (dy) ) {
              const { type: targetType } = (
                (targetField[i] || [])[tileIndex] || { type: '-' }
              );

              if (!targetType) {
                tile.offsetY += dy;
                moves += Math.abs(dy);
              }
              else {
                break;
              }
            }
          }
        }
      });
    });

    this.animationField = (moves) ? animationField : null;
    this.targetField = targetField;
  }

  listenForInputAgain = () => {
    this.props.setMoveDirection(null);
    this.props.setAnimationProgress(0);
    this.targetField = null;
    this.animationField = null;
  }

  update = (render, epsilon) => {
    const gameOver = this.props.znva.game === 'over';

    if (!gameOver) {
      const {
        calculateFields,
        addTile,
        listenForInputAgain,
        gameOverCheck
      } = this;
      const { setAnimationProgress, setField } = this.props;
      const { moveDirection, animationProgress } = this.props.znva;

      if (moveDirection) {
        if (!this.targetField) {
          calculateFields();
          setField(this.animationField || this.targetField);
        }

        const { animationField } = this;

        if (!animationField) {
          listenForInputAgain();
        }
        else {
          if (animationProgress < 1) {
            setAnimationProgress(animationProgress + ANIMATION_STEP_SIZE);
          }
          else {
            addTile(this.targetField);
            setField(this.targetField);
            listenForInputAgain();
            gameOverCheck();
          }
        }
      }

      if (render) {
        this.props.updateRenderedField(this.props.znva.field);
      }
    }
  }

  render() {
    const { animationProgress, renderedField: field } = this.props.znva;

    return (
      <PlayingField field={field} animationProgress={animationProgress} />
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
    setField: (field) => dispatch(setField(field)),
    updateRenderedField: (field) => dispatch(updateRenderedField(field)),
    setMoveDirection: (direction) => dispatch(setMoveDirection(direction)),
    updateScore: (score) => dispatch(updateScore(score)),
    setAnimationProgress: (prog) => dispatch(setAnimationProgress(prog)),
    setGameState: (game) => dispatch(setGameState(game)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
