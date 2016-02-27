const Game = React.createClass({
  getDefaultProps() {
    return {numCells: 3600, rowLength: 60, livingCells: 720, numSimulations: 25}
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
      cells.push(<Cell {...this.cellProps(i)} />);
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

  cellProps(index) {
    return {
      ref: (cell) => this.cells.push(cell),
      onDeath: (cell) => {
        this.deadCells.push(this.cells.indexOf(cell))
      },
      onBirth: (cell) => {
        this.bornCells.push(this.cells.indexOf(cell))
      },
      key: index
    }
  },

  createCellGrid() {
    let grid = [];

    for (var i = 0; i < this.props.numCells; i++) {
      grid.push(this.state.cellElements[i]);

      if (this.endOfRow(i)) {
        grid.push(<br key={1000000 + i}/>)
      }
    }

    return grid
  },

  render() {
    return (
      <div>

        <div className="grid">
          {this.createCellGrid()}
        </div>

        <br/>

        <button
          onClick={(e) => {
                    let generations = this.props.numSimulations;
                    let interval = 150;

                    $(e.target).attr('disabled', true);

                    for (var i = 0; i < generations; i++) {
                      setTimeout(() => this.simulateGeneration(), i * interval);
                    }

                    setTimeout(() => $(e.target).attr('disabled', false), (generations - 1) * interval)
                  }
          }
        >
          Simulate {this.props.numSimulations} Generations
        </button>

        <br/>

        <button
          onClick={() => {
                    ReactRailsUJS.unmountComponents();
                    ReactRailsUJS.mountComponents();
                  }
          }
        >
          Reset
        </button>
      </div>
    )
  }
});