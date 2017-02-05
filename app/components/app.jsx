import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Game from './Game'

class App extends Component {
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

export default App;
