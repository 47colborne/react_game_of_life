const Cell = React.createClass({
  getInitialState() {
    return {neighbourCount: 0}
  },

  getDefaultProps() {
    return {alive: false}
  },

  modifyNeighbourCount(change) {
    this.setState((oldState) => {
      return {neighbourCount: oldState.neighbourCount + change}
    })
  },

  simulateGeneration() {
    if (this.props.alive) {
      if (this.state.neighbourCount < 2) {
        console.log(`I died due to underpopulation - ${this.state.neighbourCount}`);
        this.props.onDeath(this)
      } else if (this.state.neighbourCount > 3) {
        console.log(`I died due to overpopulation - ${this.state.neighbourCount}`);
        this.props.onDeath(this)
      } else if (this.state.neighbourCount >= 2 && this.state.neighbourCount <= 3) {
        console.log(`I stayed alive - ${this.state.neighbourCount}`)
      }
    } else {
      if (this.state.neighbourCount == 3) {
        console.log(`I was born - ${this.state.neighbourCount}`);
        this.props.onLife(this)
      }
    }
  },

  render() {
    return (
      <div className="cell">
        {this.props.alive ? 'X' : ''}
      </div>
    )
  }
});