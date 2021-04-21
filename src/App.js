import './App.css';
import Box from './Box.js';
import swal from 'sweetalert';
import React, { Component } from 'react';

// Main component
class App extends Component {

  // central state
  constructor() {
    super();
    this.state = {
      count: 0,
      turn: true,
      grid: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  }

  // check winning criteria for a player
  winnerChecker = (id) => {

    const grid = this.state.grid;

    // horizontal sets
    if (grid[0] === grid[1] && grid[1] === grid[2] && grid[2] === id)
      return [0, 1, 2];
    if (grid[3] === grid[4] && grid[4] === grid[5] && grid[5] === id)
      return [3, 4, 5];
    if (grid[6] === grid[7] && grid[7] === grid[8] && grid[8] === id)
      return [6, 7, 8];

    // vertical sets
    if (grid[0] === grid[3] && grid[3] === grid[6] && grid[6] === id)
      return [0, 3, 6];
    if (grid[1] === grid[4] && grid[4] === grid[7] && grid[7] === id)
      return [1, 4, 7];
    if (grid[2] === grid[5] && grid[5] === grid[8] && grid[8] === id)
      return [2, 5, 8];

    // cross sets
    if (grid[0] === grid[4] && grid[4] === grid[8] && grid[8] === id)
      return [0, 4, 8];
    if (grid[2] === grid[4] && grid[4] === grid[6] && grid[6] === id)
      return [2, 4, 6];

    return null;
  }

  // utility to check winning player
  checkWinner = () => {

    // player 1
    let p1 = this.winnerChecker(1);
    if (p1 !== null) {

      // highlight winning path
      p1.forEach(data => {
        let tmpRef = document.getElementById("box:" + data);
        tmpRef.style.backgroundColor = 'lightgreen';
      });

      // notify
      swal({
        title: "Congratulations",
        text: "Player 1 Won!",
        icon: "success",
        closeOnClickOutside: "false",
        button: { text: "Play Again" }
      })
        .then(() => window.location.reload());

      return;
    }

    // player 2
    let p2 = this.winnerChecker(2);
    if (p2 !== null) {

      // highlight winning path
      p2.forEach(data => {
        let tmpRef = document.getElementById("box:" + data);
        tmpRef.style.backgroundColor = 'lightgreen';
      });

      // notify
      swal({
        title: "Congratulations",
        text: "Player 2 Won!",
        icon: "success",
        closeOnClickOutside: "false",
        button: { text: "Play Again" }
      })
        .then(() => window.location.reload());

      return;
    }

    // draw
    if (this.state.count === 8)
      swal({
        title: "Attention",
        text: "Match ended with a draw!",
        icon: "info",
        closeOnClickOutside: "false",
        button: { text: "Play Again" }
      })
        .then(() => window.location.reload());

  }

  // update central state
  markBox = (index) => {

    let count = this.state.count;
    let turn = this.state.turn;
    let grid = this.state.grid;

    grid[index] = (turn === true) ? 1 : 2;
    turn = !turn;
    count++;

    this.setState({ grid, turn, count });
    this.checkWinner();
  }

  render() {
    return (
      <>

        <h1> Tic Tac Toe </h1>

        <div id='board'>

          <Box uid="0" markBox={this.markBox} turn={this.state.turn} />
          <Box uid="1" markBox={this.markBox} turn={this.state.turn} />
          <Box uid="2" markBox={this.markBox} turn={this.state.turn} />
          <Box uid="3" markBox={this.markBox} turn={this.state.turn} />
          <Box uid="4" markBox={this.markBox} turn={this.state.turn} />
          <Box uid="5" markBox={this.markBox} turn={this.state.turn} />
          <Box uid="6" markBox={this.markBox} turn={this.state.turn} />
          <Box uid="7" markBox={this.markBox} turn={this.state.turn} />
          <Box uid="8" markBox={this.markBox} turn={this.state.turn} />

        </div>

        <h2> Player {(this.state.turn === true) ? "1" : "2"} turn </h2>

      </>
    );
  }
};

export default App;
