# Flatris

> A React-Redux Tetris clone

## Table of Contents

* [Installation](#installation)
* [Implementation Details](#implementation-details)
  * [Playing Field](#playing-field)
  * [Tetrominoes](#tetrominoes)
  * [Game Loop and Rendering](#game-loop-and-rendering)

## Installation

```sh
git clone https://github.com/honmanyau/games games
cd games/flatris
npm install
yarn run start
```

## Implementation Details

### Playing Field

The visible playing field is 10 x 20 (width x height), with one extra row at the
top as buffering for the matrix of a newly generated tetromino. The data is
stored as an array of arrays, where each of the child array, with a length of
10, contains a value that indicates whether it's empty or occupied by part of
one of the seven tetrominoes.

### Tetrominoes

Each of the tetrominoes can be represented as a 4x4 matrix, in the case of the
tetromioes I and O, or a 3x3 matrix for all other tetrominoes. If the position
of each cell in a matrix of size `s` is labelled as `i, j`; where `i` is the
row index, and `j` the column index, of a tile with respect to the tetromino
matrix, the new position of a given cell after a clockwise rotation of 90˚,
`l, m`, can be calculated as:

```javascript
l = s - i;
m = i;
```

### Game Loop and Rendering

A React-Redux game loop, [Circlet](http://github.com/honmanyau/circlet), that
is based on the `window.requestAnimationFrame()` web API () is used to keep
the (minimal) physics of the game as accurate as possible.

Re-render occurs when [Circlet](http://github.com/honmanyau/circlet)
has finished one loop **and** when any of the following conditions is met:

1. When the position of a tetromino changes
2. When a tetromino is rotated

Due to the way that [Circlet](http://github.com/honmanyau/circlet) is designed
at the time this is written (version 1.1.9), the `shouldComponentUpdate`
lifecycle is necessary for limiting the rendering rate of the game, which
relies on changes in the state of the game in the Redux store.
