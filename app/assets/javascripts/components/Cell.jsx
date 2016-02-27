const Cell = React.createClass({
  getInitialState() {
    return {neighbourCount: 0}
  },

  getDefaultProps() {
    return {alive: false}
  },

  modifyNeighbourCount(num) {
    this.setState({neighbourCount: this.state.neighbourCount + num})
  },

  render() {
    if (this.props.alive) {
      return (
        <div className="cell">
          X
        </div>
      )
    } else {
      return null
    }
  }
});