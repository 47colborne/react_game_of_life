import React from 'react';

export default class Cell extends React.Component {
  state = {alive: false};

  componentWillMount() {
    this.neighbourCount = 0
  }

  modifyNeighbourCount(change) {
    this.neighbourCount = this.neighbourCount + change
  }

  makeAlive() {
    this.setState({alive: true});
    this.props.onBirth(this)
  }

  makeDead() {
    this.setState({alive: false});
    this.props.onDeath(this);
  }

  simulateGeneration() {
    if (this.state.alive) {
      if (this.neighbourCount < 2 || this.neighbourCount > 3) {
        this.makeDead();
      }
    } else if (this.neighbourCount == 3) {
      this.makeAlive();
    }
  }

  render() {
    return (
      <div className="cell" style={this.state.alive ? {backgroundColor: 'black'} : null} />
    )
  }
}
