const Game = React.createClass({
  getDefaultProps() {
    return {numCells: 12, rowLength: 4, livingCells: 4}
  },

  getInitialState() {
    return {cells: []}
  },

  componentWillMount() {
    let cells = [];
    this.cells = [];
    for (var i = 0; i < this.props.numCells; i++) {
      cells.push(<Cell ref={(cell) => this.cells.push(cell)} />);
    }

    this.seedCells(cells)
  },

  seedCells(cells) {
    for (var i = 0; i < this.props.livingCells; i++) {
      let rand = Math.floor(Math.random() * this.props.numCells);
      console.log(`Making cell #${rand} alive`);
      cells[rand] = <Cell alive={true} ref={(cell) => this.cells.push(cell)} />;
      this.setState({cells: cells})
    }
  },

  endOfRow(num) {
    return num % this.props.rowLength == this.props.rowLength - 1;
  },

  createCellGrid() {
    let grid = [];

    for (var i = 0; i < this.props.numCells; i++) {
      grid.push(this.state.cells[i]);

      if (this.endOfRow(i)) {
        grid.push(<br/>)
      }
    }

    return grid
  },

  render() {
    return (
      <div>
        {this.createCellGrid()}
      </div>
    )
  }
});