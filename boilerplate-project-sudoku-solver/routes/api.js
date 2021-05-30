'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      //console.log(req.body, "<= POST check req");
      let coordinates = req.body.coordinate;
      let puzzle = req.body.puzzle.toString();

      // Missing fields
      if (!req.body.value || !req.body.coordinate || !req.body.puzzle) {
        return res.json({error: 'Required field(s) missing'})
      }
      // Check coordinate field
      if (coordinates.length !== 2 || coordinates.match(/[^A-I1-9]{1,2}/gi)) {
        return res.json({ error: 'Invalid coordinate'})
      }
      // Check value field
      if (req.body.value.length > 1 || req.body.value.match(/[^1-9]/)) {
        return res.json({ error: 'Invalid value'})
      }
      // Validate puzzle string
      let [err, errorString] = solver.validate(req.body.puzzle);
      if (err) {
        return res.json({
          error: errorString
        })
      }
      // Validate coordinates
      let row = coordinates[0].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
      let column = parseInt(coordinates[1] - 1);
      let value = parseInt(req.body.value);
      let conflict = [];

      //console.log("Row Type:", typeof row);
      //console.log("Row:", row);
      //console.log("Col Type:", typeof column);
      //console.log("Col:", column);
      //console.log("Value Type:", typeof value);
      //console.log("Value:", value);

      let checkRow = solver.checkRowPlacement(solver.createGrid(puzzle), row, column, value);
      let checkCol = solver.checkColPlacement(solver.createGrid(puzzle), row, column, value);
      let checkRegion = solver.checkRegionPlacement(solver.createGrid(puzzle), row, column, value);
      // Check row - if fails, report row
      if (!checkRow) {
        conflict.push('row');
      }
      // Check column - if fails, report column
      if (!checkCol) {
        conflict.push('column');
      }
      // Check region - if fails, report region
      if (!checkRegion) {
        conflict.push('region')
      }

      if (conflict.length > 0) {
        return res.json({
          valid: false,
          conflict: conflict
        })
      }
      // Everything checks out
      return res.json({
        valid: true
      })
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      //console.log(req.body, "<= POST solve req");
      //let puzzle = req.body.puzzle.toString();

      // Missing puzzle string
      if (!req.body.puzzle) {
        return res.json({
          error: 'Required field missing'
        })
      }

      // Any other errors
      let [err, errorString] = solver.validate(req.body.puzzle);
      if (err) {
        return res.json({
          error: errorString
        })
      }

      // Try to solve
      if (solver.solve(req.body.puzzle)) {
        return res.json({
          solution: solver.convertGrid()
        })
      } else {
        return res.json({
          error: 'Puzzle cannot be solved'
        })
      }
    });
};
