const Cell = React.createClass({
  getInitialState() {
    return {alive: false, neighbourCount: 0}
  },

  modifyNeighbourCount(change) {
    this.setState((oldState) => {
      return {neighbourCount: oldState.neighbourCount + change}
    })
  },

  makeAlive() {
    this.setState({alive: true})
  },

  makeDead() {
    this.setState({alive: false})
  },

  simulateGeneration() {
    if (this.state.alive) {
      if (this.state.neighbourCount < 2) {
        console.log(`I died due to underpopulation with ${this.state.neighbourCount} neighbours`);
        this.props.onDeath(this)
      } else if (this.state.neighbourCount > 3) {
        console.log(`I died due to overpopulation with ${this.state.neighbourCount} neighbours`);
        this.props.onDeath(this)
      } else if (this.state.neighbourCount >= 2 && this.state.neighbourCount <= 3) {
        console.log(`I stayed alive with ${this.state.neighbourCount} neighbours`)
      }
    } else {
      if (this.state.neighbourCount == 3) {
        console.log(`I was born with ${this.state.neighbourCount} neighbours`);
        this.props.onBirth(this)
      }
    }
  },

  render() {
    return (
      <div className="cell">
        {this.state.alive ? 'x' : ''}
      </div>
    )
  }
});