const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  suite('Function validate()', () => {
    //#1
    test('Valid puzzle length and characters', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let [err, errorString] = solver.validate(input);
      assert.isString(input);
      assert.isFalse(err);
      done();
    })
    //#2
    test('Invalid characters (not 1-9 or .)', done => {
      let input = '1g5..2.84..63.12.7.2..5.BAD.9..+STR.8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let [err, errorString] = solver.validate(input);
      assert.isString(input);
      assert.isTrue(err, 'Invalid characters in puzzle');
      done();
    })
    //#3
    test('Invalid puzzle string length', done => {
      let input = '12.7.2..5..9...8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      
      let [err, errorString] = solver.validate(input);
      assert.isString(input);
      assert.isTrue(err, 'Expected puzzle to be 81 characters long');
      done();
    })
  })
  suite('Function checkRowPlacement()', () => {
    //#4
    test('Valid row placement', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let row = 0;
      let column = 0;
      let value = 7;
      assert.isTrue(solver.checkRowPlacement(solver.createGrid(input), row, column, value));
      done();
    })
    //#5
    test('Invalid row placement', done => {
    let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let row = 0;
      let column = 1;
      let value = 1;
      assert.isFalse(solver.checkRowPlacement(solver.createGrid(input), row, column, value));
      done();
    })
  })
  suite('Function checkColPlacement()', () => {
    //#6
    test('Valid column placement', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let row = 0;
      let column = 1;
      let value = 7;
      assert.isTrue(solver.checkColPlacement(solver.createGrid(input), row, column, value));
      done();
    })
    //#7
    test('Invalid column placement', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let row = 0;
      let column = 0;
      let value = 6;
      assert.isFalse(solver.checkColPlacement(solver.createGrid(input), row, column, value));
      done();
    })
  })
  suite('Function checkRegionPlacement()', () => {
    //#8
    test('Valid region placement', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let row = 0;
      let column = 2;
      let value = 9;
      assert.isTrue(solver.checkRegionPlacement(solver.createGrid(input), row, column, value));
      done();
    })
    //#9
    test('Invalid region placement', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let row = 0;
      let column = 0;
      let value = 5;
      assert.isFalse(solver.checkRegionPlacement(solver.createGrid(input), row, column, value));
      done();
    })
  })
  suite('Function solve()', () => {
    //#10
    test('Valid puzzle passes solver', done => {
      let input = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

      solver.createGrid(input);
      assert.isTrue(solver.validateSolution());
      done();
    })
    //#11
    test('Invalid puzzle fails solver', done => {
      let input = '777762984946381257728459613694517832812936745357824196473298561581673429269145378';

      solver.createGrid(input);
      assert.isFalse(solver.validateSolution());
      done();
    })
    //#12
    test('Solver returns expected solution for valid incomplete puzzles', done => {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let output = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';

      solver.solve(input);
      assert.equal(output, solver.convertGrid());
      done();
    })
  })
});