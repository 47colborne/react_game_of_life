import React from 'react';
import ReactDom from 'react-dom';
import ReactCanvas, { Surface, Layer, Group, Gradient } from 'react-canvas';

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
    this.setState({alive: true});
    this.props.onBirth(this)
  },

  makeDead() {
    this.setState({alive: false});
    this.props.onDeath(this);
  },

  simulateGeneration() {
    if (this.state.alive) {
      if (this.neighbourCount < 2 || this.neighbourCount > 3) {
        this.makeDead();
      }
    } else if (this.neighbourCount == 3) {
      this.makeAlive();
    }
  },

  getGradientStyle() {
    return {
      top: Math.floor(this.props.index / 40) * 15,
      left: this.props.index % 40 * 15,
      width: 15,
      height: 15
    };
  },

  getGradientColors: function(){
    return [
      { color: this.state.alive ? "black" : "transparent", position: 0 }
    ];
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.alive != nextState.alive;
  },

  render() {
    return (
      <Gradient style={this.getGradientStyle()} colorStops={this.getGradientColors()} />
    )
  }
});

export default Cell