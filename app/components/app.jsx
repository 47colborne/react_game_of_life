import React from 'react';
import Game from './Game';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Conway's Game of Life</h1>
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" rel="nofollow">
          What is it?
        </a>
        <Game />
      </div>
    )
  }
}
