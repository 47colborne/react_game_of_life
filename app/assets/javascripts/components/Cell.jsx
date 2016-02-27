const Cell = React.createClass({
  getInitialState() {
    return {neighbourCount: 0}
  },

  getDefaultProps() {
    return {alive: false}
  },

  modifyNeighbourCount(num) {
    this.setState((oldState) => {
      return {neighbourCount: oldState.neighbourCount + num}
    })
  },

  simulateGeneration() {
    if (this.props.alive) {
      if (this.state.neighbourCount < 2) {
        console.log(`I died due to underpopulation - ${this.state.neighbourCount}`)
      } else if (this.state.neighbourCount > 3) {
        console.log(`I died due to overpopulation - ${this.state.neighbourCount}`)
      } else if (this.state.neighbourCount >= 2 && this.state.neighbourCount <= 3) {
        console.log(`I stayed alive - ${this.state.neighbourCount}`)
      }
    } else {
      if (this.state.neighbourCount == 3) {
        console.log(`I was born - ${this.state.neighbourCount}`)
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