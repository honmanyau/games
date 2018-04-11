# 2048

> A React-Redux 2048 clone

## Table of Contents

* [Installation](#installation)
* [Implementation Details](#implementation-details)
  * [Playing Field](#playing-field)

## Installation

```sh
git clone https://github.com/honmanyau/games games
cd games/2048
npm install
yarn run start
```

## Implementation Details

### Playing Field

The 2048 playing field is simply a 4x4 grid that can be represented by an array
of four arrays, where each of the child array represents a row. A 4x4 CSS Grid
is used for the the moving tiles, which is overlaid on top of another 4x4 CSS
Grid of the same size containing 16 grey, unmoving tiles as the background.

### Game Logic

1. Determine the direction of a player move
2. Calculate the target field, that is, the final state of the field after a
given move, and update the score where necessary
3. For the given direction, calculate the amount that each tile needs to move
to transform the initial field to the target field
4. Animate the intermediate states between the initial field and the target
field
5. Check whether the player has exhausted all possible moves. If so, display
a game over/restart message; otherwise, listen for inputs again
