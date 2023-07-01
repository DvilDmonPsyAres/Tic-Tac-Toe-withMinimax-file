const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', TTT.testCommand);
    Screen.addCommand('i','Move up', this.cursor.up.bind(this.cursor))
    Screen.addCommand('k','Move down', this.cursor.down.bind(this.cursor))
    Screen.addCommand('j','Move left', this.cursor.left.bind(this.cursor))
    Screen.addCommand('l','Move right', this.cursor.right.bind(this.cursor))
    Screen.addCommand('p', 'Place Move', TTT.placeMove.bind(this));

    Screen.render();
  }

  static placeMove(){
    const row = this.cursor.row;
    const col = this.cursor.col;
    const currentMove = this.grid[row][col];

    if(currentMove === " ") {
      this.grid[row][col] = this.playerTurn;
      Screen.setGrid(row, col, this.playerTurn);

      const winner = TTT.checkWin(this.grid);
      if(winner !== false) {
        TTT.endGame(winner);
      } else {
        this.playerTurn = this.playerTurn === 'O' ? 'X' : 'O';
      }
    }
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {

    for(let i = 0; i < grid.length; i++) {
      // check if are the same by row
      if((grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) && grid[i][0] !== " ") {
          return grid[i][0]
      // cheeck if are the same by column
      } else if((grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) && grid[0][i] !== " ") {
          return grid[0][i]
      }
    }

    if(((grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) && grid[1][1] !== " " ) || ((grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) && grid[1][1] !== " ")) {
      return grid[1][1];
    }
    // Return false if the game has not ended
    for(let i = 0; i < grid.length; i++) {
      if(grid[0][i] === " ") {
          return false;
      }
      for(let j = 0; j < grid.length; j++) {
          if(grid[j][i] === " ") {
              return false
          }
      }
    }
    return "T"

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
