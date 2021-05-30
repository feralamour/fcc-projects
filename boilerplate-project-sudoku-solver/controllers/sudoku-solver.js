class SudokuSolver {
  constructor() {
    this.grid = [];
  }
  
  validate(puzzleString) {
    // Check puzzle length
    if (puzzleString.length !== 81) {
      return [true, 'Expected puzzle to be 81 characters long'];
    }
    // Check puzzle for invalid characters
    if (puzzleString.match(/[^1-9.]/)) {
      return [true, 'Invalid characters in puzzle'];
    }
    // Everything is valid, no errors
    return [false, ''];
  }

  createGrid(puzzleString) {
    if (typeof puzzleString === 'string') {
      this.grid = puzzleString.split('').reduce((a, c, i) => {
        return i % 9 === 0 ? a.concat([puzzleString.split('').slice(i, i+ 9)]) : a;
      }, []);
    
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          let value = this.grid[row][col];
          if (value === '.') {
            this.grid[row][col] = parseInt(0);
          } else {
            this.grid[row][col] = parseInt(value);
          }
        }
      }
    }    
    return this.grid;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // if value exists in row, return error and location
    this.grid = puzzleString;

    for (let i = 0; i < 9; i++) {
      let cell = this.grid[row][column];
      
      if (this.grid[row][i] === value) {
        if (this.grid[row][i] === cell) {
          return true;
        }
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    // if value exists in column, return error and location
    this.grid = puzzleString;

    for (let i = 0; i < 9; i++) {
      let cell = this.grid[row][column];

      if (this.grid[i][column] === value) {
        if (this.grid[i][column] === cell) {
          return true;
        }
        return false;
      }
    }
    return true;    
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // if value exists in region, return error and location
    this.grid = puzzleString;

    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(column / 3) * 3;

    for (let r = 0; r < 3; r++){
      for (let c = 0; c < 3; c++) {
        let cell = this.grid[row][column];
        
        if (this.grid[boxRow + r][boxCol + c] === value) {
          let a = [(boxRow + r), (boxCol + c)];
          let b = [row, column];
          
          if (a.every((val, index) => val === b[index])) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
    return true;
  }

  checkValue(grid, row, column, value) {
    this.grid = grid;
    
    let checkRow = this.checkRowPlacement(grid, row, column, value);
    let checkCol = this.checkColPlacement(grid, row, column, value);
    let checkRegion = this.checkRegionPlacement(grid, row, column, value);
    
    if (checkRow && checkCol && checkRegion) {
        return true;
      }
      return false;
    };

  nextEmptyCell(grid) {
    this.grid = grid;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid[row][col] === 0) {
          return [row, col];  // Empty space found
        }
      }
    }
    return [-1,-1]; // All spaces filled
  }

  convertGrid(input) {
    let output = '';

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // Convert back to string
        output += this.grid[row][col] === 0 ? '.' : this.grid[row][col].toString();
      }
    }
    return output;
  }

  validateSolution(input) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        let num = this.grid[row][col];

        this.grid[row][col] = 0;
        if (num === 0 || !this.checkValue(this.grid, row, col, num)) {
          this.grid[row][col] = num;
          return false;
        }
        this.grid[row][col] = num;
      }
    }
    return true;
  }

  solve(puzzleString) {
    if (typeof puzzleString === 'undefined') {
      return false;
    }

    if (typeof puzzleString === 'string') {
      if (puzzleString.length !== 81 || puzzleString.match(/[^1-9.]/)) {
        return false;
      }
    }
    
    this.grid = this.createGrid(puzzleString);

    let emptyCell = this.nextEmptyCell(this.grid);
    let row = emptyCell[0];
    let col = emptyCell[1];

    if (row === -1) {
      if(this.validateSolution(this.grid)) {
        return true;
      } else {
        return false;
      }
    }

    for (let num = 1; num <=9; num++) {
      if (this.checkValue(this.grid, row, col, num)) {
        this.grid[row][col] = num;
        if (this.solve(this.grid)) {
          return true;
        }
        this.grid[row][col] = 0;
      }
    }

    if (this.nextEmptyCell(this.grid)[0] !== -1) {
      this.grid[row][col] = 0;
    }

    return false;
  }
}

module.exports = SudokuSolver;
