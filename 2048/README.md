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
of four arrays, where each of the child array represents a row.
