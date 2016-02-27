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
        this.props.onDeath(this)
      } else if (this.state.neighbourCount > 3) {
        this.props.onDeath(this)
      } else if (this.state.neighbourCount >= 2 && this.state.neighbourCount <= 3) {
      }
    } else {
      if (this.state.neighbourCount == 3) {
        this.props.onBirth(this)
      }
    }
  },

  shouldComponentUpdate(newProps, newState) {
    return this.state.alive != newState.alive
  },

  render() {
    return (
      <div className="cell">
        {this.state.alive ? '.' : ''}
      </div>
    )
  }
});