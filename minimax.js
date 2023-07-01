let grid = [['X','X','O'],
            [' ','O',' '],
            [' ',' ',' ']];

const human = "O";
const ai = "X";


function cheeckWinner (grid) {
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

const computerMoves = (grid) => {
    let move;
    let bestScore = -Infinity
    for(i in grid) {
        for(j in grid) {
            if(grid[i][j] === " "){
                // validMoves.push({row: i, grid: j})
                grid[i][j] = ai;

                let score = minimax(grid, 0, false);
                console.log(score)
                grid[i][j] = " ";
                if(score > bestScore) {
                    bestScore = score;
                    move = {row: i, col: j}
                }
            }
        }
    }
    grid[move.row][move.col] = ai
    currentPlayer = human
}
// X = MAXimizing
// O = Minimizing
let scores = {
    X: 1,
    O: -1,
    T: 0
};
//writing minimax
function minimax(grid, depth,isMaximizing) {
    let result = cheeckWinner(grid);
    if (result !== false) {
        let score = scores[result]
        return score;
    }

    if(isMaximizing) {
        let bestScore = -Infinity;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                //is the spot available?
                if(grid[i][j] === " ") {
                    grid[i][j] = ai;
                    let score = minimax(grid, depth + 1, false);
                    console.log(`minimax tests Maximizing : ${score}`)
                    grid[i][j] = " ";
                    if(score > bestScore) {
                        bestScore = score;
                    }
                }
            }

        }
    return bestScore;
    } else {
        let bestScore = Infinity;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                //is the spot available?
                if(grid[i][j] === " ") {
                    grid[i][j] = human;
                    let score = minimax(grid, depth + 1, true);
                    console.log(`minimax tests Minimizing : ${score}`)
                    grid[i][j] = " ";
                    if(score < bestScore) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    }
}

console.log(`Game ends?: ${cheeckWinner(grid)}`)
console.log(grid)
computerMoves(grid)
console.log(grid)


// currentPlayer = checkTurn(grid, human)
//
// console.log(`current Player is: ${currentPlayer}`)
// //  Human Always First
// //  currentPlayer = checkTurn()

// const checkTurn = (game, first) => {
//     let O = 0;
//     let X = 0;
//     for(i in grid) {
//         for(j in grid) {
//             el = grid[i][j]
//             if(el === "O") {
//                 O+=1
//             } else if(el === "X") {
//                 X+=1
//             }
//         }
//     }

//     console.log(O);
//     console.log(X);

//     if(O > X || O !== X) {
//         currentPlayer = ai;
//     } else {
//         currentPlayer = first;
//     }

//     return currentPlayer;
// }

// console.log(validMoves(grid));
// const computerMove = validMoves => {
//     grid[validMoves.row][validMoves.grid] = ai
// }



// if(availableMoves !== []) {
//     computerMove(availableMoves(grid));
//     console.log("add a Move");
// }


// let validMoves = grid => {
//     let validMoves = [];
//     for(i in grid) {
//         for(j in grid) {
//             if(grid[i][j] === " ") {
//                 validMoves.push({row: i, col: j})
//             }
//         }
//     }
//     return validMoves;
// }
