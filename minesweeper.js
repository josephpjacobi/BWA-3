class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  //End of constructor

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
       console.log('Game Over! Here is the final board: ');
      this._board.print();
      }
    else if (this._board.hasSafeTiles()) {
      console.log('Current Board: ');
      this._board.print();
    } else {
      console.log('Congratulations on winning! Here was your winning board:')
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
  }
  //End of constructor
  get playerBoard() {
    return this._playerBoard;
  }

  hasSafeTiles() {
   return this._numberOfTiles !== this._numberOfBombs;
  }


  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1],
      [-1, 0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1],
    ];
    //This section derives the dimentions of the board and stores the number of adjacent bombs
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

  //This itereates through each array in the neighborOffsets
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1]
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
            numberOfBombs++;
          }
        }
    });

  return numberOfBombs;
  }
  //^End of getNumberOfNeighborBombs function


flipTile = (rowIndex, columnIndex) => {
     if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
       console.log('This tile has already been flipped!')
       return;
     }

     this._numberOfTiles--
     if (this._bombBoard[rowIndex][columnIndex] === 'B') {
       this._playerBoard[rowIndex][columnIndex] = 'B';
     } else {
       this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
     }
     ;
  }
//End of flipTile function ^

  print() {
      console.log(board.map(row => row.join(' | ')).join('\n'));
    };


  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    //interates through number of rows//
      for (let r = 0; r < numberOfRows; r++) {
  //Creates an empty row array//
        const row = [];
        for (let c = 0; c < numberOfColumns; c++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    //interates through number of rows//
      for (let r = 0; r < numberOfRows; r++) {
    //Creates an empty row array//
        const row = [];
        for (let c = 0; c < numberOfColumns; c++) {
          row.push(null);
        }
        board.push(row);
      }

      let numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        //generates random row/column
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        //Checks to see if a bomb is in the random spot
          if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
          }
      }
      return board;
  }
}
//End of board class ^
