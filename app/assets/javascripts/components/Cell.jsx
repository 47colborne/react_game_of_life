const Cell = React.createClass({
  getInitialState() {
    return {alive: false}
  },

  componentWillMount() {
    this.neighbourCount = 0
  },

  modifyNeighbourCount(change) {
    this.neighbourCount = this.neighbourCount + change
  },

  makeAlive() {
    this.setState({alive: true})
  },

  makeDead() {
    this.setState({alive: false})
  },

  simulateGeneration() {
    if (this.state.alive) {
      if (this.neighbourCount < 2 || this.neighbourCount > 3) {
        this.makeDead();
        this.props.onDeath(this);
      }
    } else if (this.neighbourCount == 3) {
      this.makeAlive();
      this.props.onBirth(this)
    }
  },

  render() {
    return (
      <div className="cell" style={this.state.alive ? {backgroundColor: 'black'} : null} />
    )
  }
});