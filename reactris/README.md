# Reactris

> A React-Redux Tetris clone

## Table of Contents

* [Installation](#installation)
* [Implementation Details](#implementation-details)
  * [Playing Field](#playing-field)
  * [Tetrominos](#tetrominos)
  * [Game Loop and Rendering](#game-loop-and-rendering)

## Installation

## Implementation Details

### Playing Field

The visible playing field is 10 x 20 (width x height) ~~and 2 extra rows are
used as buffering for the next tetromino~~. The data is stored as an array of
20 arrays, where each of the child array, with a length of 10, contains a value
that indicates whether it's empty or occupied by part of one of the seven
tetrominos.

### Tetrominos

Each of the tetrominos can be represented as a 4x4 matrix, in the case of the
straight tetromino, or a 3x3 matrix for all other tetrominos. If the position
of each cell in a matrix of size `s` is labelled as `i, j`, where `i` is number
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

Re-render occurs when **both** of the following conditions are met:

1. When the playing field's current state changes
2. When [Circlet](http://github.com/honmanyau/circlet) has finished looping
through the update functions that are subscribed to it

Due to the way that [Circlet](http://github.com/honmanyau/circlet) is designed
at the time this is written (version 1.1.9), the `shouldComponentUpdate`
lifecycle is necessary for limiting the rendering rate of the game, which
relies on changes in the state of the game in the Redux store.
