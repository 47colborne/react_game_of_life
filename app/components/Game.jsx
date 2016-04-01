import React from 'react';
import ReactDom from 'react-dom';
import Cell from './Cell'
import ReactCanvas, { Surface, Layer, Group, Gradient } from 'react-canvas';

const Game = React.createClass({
  getDefaultProps() {
    return {numCells: 1600, rowLength: 40, livingCells: 400, numSimulations: 1000, simulationInterval: 0}
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
  },

  seedCells() {
    this.seeds = [];

    for (var i = 0; i < this.props.livingCells; i++) {
      let randomIndex = Math.floor(Math.random() * this.props.numCells);

      if (!this.seeds.includes(randomIndex)) {
        this.seeds.push(randomIndex);
        this.cells[randomIndex].makeAlive();
      }
    }

    this.dispatchNeighbourChanges()
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
      this.notifyNeighbouringCells(cell, -1)
    });

    this.bornCells.forEach((cell) => {
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
      index: index,
      key: index
    }
  },

  createCellGrid() {
    let grid = [];

    for (var i = 0; i < this.props.numCells; i++) {
      grid.push(this.state.cellElements[i]);
    }

    return grid
  },

  runSimulations() {
    let simulationCount = 0;

    let runSimulation = () => {
      this.simulateGeneration();
      simulationCount++;

      if (simulationCount < this.props.numSimulations) {
        setTimeout(runSimulation, this.props.simulationInterval)
      }
    };

   runSimulation()
  },

  shouldComponentUpdate() {
    return false;
  },

  render() {
    return (
      <div>
        <Surface width={600} height={600} left={2} top={2}>
          {this.createCellGrid()}
        </Surface>

        <br/>
        <br/>

        <button onClick={this.runSimulations} >
          Simulate {this.props.numSimulations} Generations
        </button>
      </div>
    )
  }
});

export default Game