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
    return (
      <div className="cell">
        {this.props.alive ? 'X' : ''}
      </div>
    )
  }
});