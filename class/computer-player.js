
class ComputerPlayer {

  static getValidMoves(grid) {
    // Your code here
    let validMoves = []
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(grid[i][j] === " ") {
          validMoves.push({row: i, col: j})
        }
      }
    }
    return validMoves;
  }

  static randomMove(grid) {
    let options = this.getValidMoves(grid);
    let move = Math.floor(Math.random() * options.length);
    return options[move]
  }

  static getWinningMoves(grid, symbol) {
    let options = this.getValidMoves(grid);
    for(let i = 0; i < options.length; i++) {
      grid[options[i].row][options[i].col] =  symbol
      if(this.cheeckWinner(grid) === symbol) {
        return options[i];
      }
      grid[options[i].row][options[i].col] = ' ';
    }

  }

  static getSmartMove(grid, symbol) {
    let options = this.getValidMoves(grid);
    let loseOptions = this.getWinningMoves(grid, "O");
    let winningOptions = this.getWinningMoves(grid, symbol)
    if(winningOptions) {
      return winningOptions;
    }
    else if(loseOptions && !winningOptions) {
      return loseOptions;
    } else {
      for(let i = 0; i < options.length; i++) {
        grid[options[i].row][options[i].col] =  symbol

        if(this.cheeckWinner(grid) === symbol) {
              return options[i];
        }
      }
    }

  }

  static cheeckWinner (grid) {
    for(let i = 0; i < grid.length; i++) {
        // check if are the same to rigth
        if((grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) && grid[i][0] !== " ") {
            return grid[i][0];
        } else if((grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) && grid[0][i] !== " ") {
            return grid[0][i];
        }

    }
    if((grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) && grid[1][1] !== " "  || (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) && grid[1][1] !== " ") {
        return grid[1][1];
    }

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

    return "T" ;
  }

}

module.exports = ComputerPlayer;
