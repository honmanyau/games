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
    this.addInputListeners();
    window.addEventListener('beforeunload', () => {
      this.removeInputListeners();
    });
    this.props.initialise();
    this.props.subscribeToCirclet(this.update);
  }

  deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  }

  addInputListeners = () => {
    console.log("AYA: addInputListeners")
    const rootDiv = document.getElementById('root');

    window.addEventListener('keydown', this.handlekeydown);
    rootDiv.addEventListener('touchstart', this.handleTouchStart);
    rootDiv.addEventListener('touchmove', this.handleTouchMove);
    rootDiv.addEventListener('touchend', this.handleTouchEnd);
  }

  removeInputListeners = () => {
    const rootDiv = document.getElementById('root');

    rootDiv.removeEventListener('keydown', this.handlekeydown);
    rootDiv.removeEventListener('touchstart', this.handleTouchStart);
    rootDiv.removeEventListener('touchmove', this.handleTouchMove);
    rootDiv.removeEventListener('touchend', this.handleTouchEnd);
  }

  handlekeydown = (event) => {
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
    const refField = this.deepClone(field);
    const size = field.length - 1;

    field.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (direction === 'clockwise') {
          field[rowIndex][tileIndex] = refField[size - tileIndex][rowIndex];
        }
        if (direction === 'anticlockwise') {
          field[rowIndex][tileIndex] = refField[tileIndex][size - rowIndex];
        }
      });
    });
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
      this.props.setGameState('over');
    }
  }

  calculateFields = () => {
    const { deepClone, rotateField } = this;
    const { moveDirection, field } = this.props.znva;
    const len = field.length;
    const { x: dx, y: dy } = moveDirection;
    const rotate = !!dy;
    const reverse = (dy || dx) > 0;
    const animationField = deepClone(field);
    let targetField = deepClone(field);
    let moves = 0;

    if (rotate) {
      rotateField(targetField, 'anticlockwise');
    }

    targetField = targetField.map((row, rowIndex) => {
      row = row.filter((tile) => tile.type);

      if (reverse) {
        row.reverse();
      }

      row.forEach((tile, index) => {
        const nextIndex = index + 1;
        const nextTile = row[nextIndex];

        if (nextTile) {
          const { type } = tile;
          const { type: nextType } = nextTile;

          if (nextType === type) {
            const newType = type * 2;

            row[index].type = newType;
            row[nextIndex].type = null;
            this.props.updateScore(newType)
          }
        }
      });

      row = row.filter((tile) => tile.type);
      row = row.concat(Array.from(Array(len - row.length)).map(() => (
        { type: null, offsetX: 0, offsetY: 0 }
      )));

      if (reverse) {
        row.reverse();
      }

      return row;
    });

    if (rotate) {
      rotateField(targetField, 'clockwise');
    }

    animationField.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        const { type } = tile;

        if (type) {
          if (dx) {
            for (let i = tileIndex; i >= 0 && i < len; i += dx) {
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
            for (let i = rowIndex; i >= 0 && i < len; i += dy) {
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

  relistenForInputAfterAnimation = () => {
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
        relistenForInputAfterAnimation,
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
          relistenForInputAfterAnimation();
        }
        else {
          if (animationProgress < 1) {
            setAnimationProgress(animationProgress + ANIMATION_STEP_SIZE);
          }
          else {
            addTile(this.targetField);
            setField(this.targetField);
            relistenForInputAfterAnimation();
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
