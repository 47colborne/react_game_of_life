const Cell = React.createClass({
  getDefaultProps() {
    return {alive: false, neighbourCount: 0}
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