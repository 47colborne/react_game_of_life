const Game = React.createClass({
  getDefaultProps() {
    return {numCells: 12, rowLength: 4, livingCells: 4}
  },

  getInitialState() {
    return {cellElements: []}
  },

  componentWillMount() {
    let cells = [];
    this.deadCells = [];
    this.bornCells = [];
    this.cells = [];

    for (var i = 0; i < this.props.numCells; i++) {
      cells.push(<Cell {...this.cellProps()} />);
    }

    this.setState({cellElements: cells});
  },

  componentDidMount() {
    this.seedCells();

    this.seeds.forEach((cellIndex) => {
      this.notifyNeighbouringCells(cellIndex, 1);
    })
  },

  seedCells() {
    this.seeds = [];

    for (var i = 0; i < this.props.livingCells; i++) {
      let randomIndex = Math.floor(Math.random() * this.props.numCells);
      console.log(`Making cell #${randomIndex} alive`);
      this.cells[randomIndex].makeAlive();
      this.seeds.push(randomIndex);
    }
    this.deduplicateSeeds();
  },

  deduplicateSeeds() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    this.seeds = this.seeds.filter(onlyUnique)
  },

  notifyNeighbouringCells(cellIndex, change) {
    let neighbourIndices = [];

    // Left + diagonals unless at beginning of row
    if (cellIndex % this.props.rowLength != 0) {
      neighbourIndices.push(cellIndex - this.props.rowLength - 1);
      neighbourIndices.push(cellIndex - 1);
      neighbourIndices.push(cellIndex + this.props.rowLength - 1);
    }

    // Right + diagonals unless at end of row
    if (cellIndex % this.props.rowLength != (this.props.rowLength - 1)) {
      neighbourIndices.push(cellIndex - this.props.rowLength + 1);
      neighbourIndices.push(cellIndex + 1);
      neighbourIndices.push(cellIndex + this.props.rowLength + 1);
    }

    // Up and down
    neighbourIndices.push(cellIndex - this.props.rowLength);
    neighbourIndices.push(cellIndex + this.props.rowLength);

    neighbourIndices.forEach((index) => {
      if (this.cells[index]) {
        this.cells[index].modifyNeighbourCount(change)
      }
    })
  },

  endOfRow(cellIndex) {
    return cellIndex % this.props.rowLength == this.props.rowLength - 1;
  },

  simulateGeneration() {
    this.deadCells = [];
    this.bornCells = [];

    this.cells.forEach((cell) => {
      cell.simulateGeneration()
    });

    this.dispatchNeighbourChanges()
  },

  dispatchNeighbourChanges() {
    this.deadCells.forEach((cell) => {
      this.cells[cell].makeDead();
      this.notifyNeighbouringCells(cell, -1)
    });

    this.bornCells.forEach((cell) => {
      this.cells[cell].makeAlive();
      this.notifyNeighbouringCells(cell, 1)
    })
  },

  cellProps() {
    return {
      ref: (cell) => this.cells.push(cell),
      onDeath: (cell) => {
        let cellIndex = this.cells.indexOf(cell);
        console.log(`Received notice of death from ${cellIndex}`);
        this.deadCells.push(cellIndex)
      },
      onBirth: (cell) => {
        let cellIndex = this.cells.indexOf(cell);
        console.log(`Received notice of birth from ${cellIndex}`);
        this.bornCells.push(cellIndex)
      }
    }
  },

  createCellGrid() {
    let grid = [];

    for (var i = 0; i < this.props.numCells; i++) {
      grid.push(this.state.cellElements[i]);

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