# Reactris

> A React-Redux Tetris clone

## Table of Contents

* [Installation](#installation)
* [Implementation Details](#implementation-details)
  * [Playing Field](#playing-field)
  * [Tetrominos](#tetrominos)

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
