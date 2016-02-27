const Game = React.createClass({
  getDefaultProps() {
    return {numCells: 12, rowLength: 4, livingCells: 4}
  },

  getInitialState() {
    return {cells: []}
  },

  componentWillMount() {
    let cells = [];
    this.deadCells = [];
    this.bornCells = [];
    this.cells = [];

    for (var i = 0; i < this.props.numCells; i++) {
      cells.push(<Cell {...this.cellProps()} />);
    }

    this.setState({cells: cells});
  },

  componentDidMount() {
    this.seedCells();

    this.seeds.forEach((index) => {
      this.notifyNeighbouringCells(index, 1);
    })
  },

  seedCells() {
    this.seeds = [];

    for (var i = 0; i < this.props.livingCells; i++) {
      let rand = Math.floor(Math.random() * this.props.numCells);
      console.log(`Making cell #${rand} alive`);
      this.cells[rand].makeAlive();
      this.seeds.push(rand);
    }
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