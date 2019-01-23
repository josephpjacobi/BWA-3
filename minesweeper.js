const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

//This itereates through each array in the neighborOffsets
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1]
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          numberOfBombs++;
        }
      }
  });

return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
   if (playerBoard[rowIndex][columnIndex] !== ' ') {
     console.log('This tile has already been flipped!')
     return;
   }

   if (bombBoard[rowIndex][columnIndex] === 'B') {
     playerBoard[rowIndex][columnIndex] = 'B';
   } else {
     playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
   }


}

  const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
  };

  const playerBoard = generatePlayerBoard(3,4);
  const bombBoard = generateBombBoard(3,4,5);

  console.log('Player Board: ')
  printBoard(playerBoard);

  console.log('BombBoard: ')
  printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);
