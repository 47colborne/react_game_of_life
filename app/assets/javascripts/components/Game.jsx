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
      cells.push(<Cell {...this.cellProps()} />);
    }

    this.seedCells(cells)
  },

  componentDidMount() {
    this.seeds.forEach((index) => {
      this.notifyNeighbouringCells(index, 1);
    })
  },

  seedCells(cells) {
    this.seeds = [];
    for (var i = 0; i < this.props.livingCells; i++) {
      let rand = Math.floor(Math.random() * this.props.numCells);
      console.log(`Making cell #${rand} alive`);
      cells[rand] = <Cell alive={true} {...this.cellProps()} />;
      this.seeds.push(rand);
    }
    this.setState({cells: cells});
    this.deduplicateSeeds();
  },

  deduplicateSeeds() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    this.seeds = this.seeds.filter(onlyUnique)
  },

  notifyNeighbouringCells(index, change) {
    let getNeighbouringIndices = (index) => {
      let neighbourIndices = [];

      // Left + diagonals unless at beginning of row
      if (index % this.props.rowLength != 0) {
        neighbourIndices.push(index - this.props.rowLength - 1);
        neighbourIndices.push(index - 1);
        neighbourIndices.push(index + this.props.rowLength - 1);
      }

      // Right + diagonals unless at end of row
      if (index % this.props.rowLength != (this.props.rowLength - 1)) {
        neighbourIndices.push(index - this.props.rowLength + 1);
        neighbourIndices.push(index + 1);
        neighbourIndices.push(index + this.props.rowLength + 1);
      }

      // Up and down
      neighbourIndices.push(index - this.props.rowLength);
      neighbourIndices.push(index + this.props.rowLength);

      return neighbourIndices
    };

    let _this = this;

    getNeighbouringIndices(index).forEach((index) => {
      if (_this.cells[index]) {
        _this.cells[index].modifyNeighbourCount(change)
      }
    })
  },

  endOfRow(num) {
    return num % this.props.rowLength == this.props.rowLength - 1;
  },

  simulateGeneration() {
    this.cells.forEach((cell) => {
      cell.simulateGeneration()
    })
  },

  cellProps() {
    return { ref: (cell) => this.cells.push(cell),
             onDeath: (cell) => console.log('Received notice of death'),
             onLife: (cell) => console.log('Received notice of life' ) }
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

        <button onClick={this.simulateGeneration}>Simulate Generation</button>
      </div>
    )
  }
});