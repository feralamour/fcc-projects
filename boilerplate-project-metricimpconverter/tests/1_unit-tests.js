const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Function convertHandler.getNum(input)', () => {
    // #1
    test('Whole number input', done => {
      let input = '4gal';
      assert.equal(convertHandler.getNum(input), 4);
      done();
    })
    // #2
    test('Decimal input', done => {
      let input = '3.1mi';
      assert.equal(convertHandler.getNum(input), 3.1);
      done();
    })
    // #3
    test('Fractional input', done => {
      let input = '1/2km';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    })
    // #4
    test('Fractional input with decimal', done => {
      let input = '5.4/3lbs';
      assert.equal(convertHandler.getNum(input), 1.8);
      done();
    })
    // #5
    test('Fractional input (double fraction)', done => {
      let input = '1/3/5mi';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    })
    // #6
    test('No numerical input', done => {
      let input = 'kg';
      assert.equal(convertHandler.getNum(input), 1);
      assert.equal(convertHandler.getUnit(input), 'kg');
      done();
    })
  });

  suite('Function convertHandler.getUnit(input)', () => {
    // #7
    test('For each valid input unit', done => {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      let expected = ['gal','L','mi','km','lbs','kg'];
      input.forEach(unit => {
        assert.oneOf(convertHandler.getUnit(2 + unit), expected);
      });
      //liter.forEach(unit => {
      //  assert.equal(convertHandler.getUnit(2 + unit), unit.toUpperCase());
      //})
      done();
    })
    // #8
    test('Invalid input unit', done => {
      let input = '42g';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    })
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', () => {
    // #9
    test('For each valid unit input', done => {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach((unit, i) => {
        assert.equal(convertHandler.getReturnUnit(unit), expect[i]);
      });
      done();
    })
  });

  suite('Function convertHandler.spellOutUnit(unit)', () => {
    // #10
    test('For each valid unit input', done => {
      let input = ['gal','L','mi','km','lbs','kg'];
      let expected = [
        'gallons',
        'liters',
        'miles',
        'kilometers',
        'pounds',
        'kilograms'
        ];
      input.forEach((unit, i) => {
        assert.equal(convertHandler.spellOutUnit(unit), expected[i]);
      });
      done();
    })
  });

  suite('Function convertHandler.convert(initNum, initUnit)', () => {
    // #11
    test('gal to L', done => {
      let input = [10, 'gal'];
      let expected = 37.8541;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // precision tolerance
      );
      done();
    })
    // #12
    test('L to gal', done => {
      let input = [10, 'L'];
      let expected = 2.64172;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // precision tolerance
      );
      done();
    })
    // #13
    test('mi to km', done => {
      let input = [10, 'mi'];
      let expected = 16.0934;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // precision tolerance
      );
      done();
    })
    // #14
    test('km to mi', done => {
      let input = [10, 'km'];
      let expected = 6.21371;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // precision tolerance
      );
      done();
    })
    // #15
    test('lbs to kg', done => {
      let input = [10, 'lbs'];
      let expected = 4.53592;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // precision tolerance
      );
      done();
    })
    // #16
    test('kg to lbs', done => {
      let input = [10, 'kg'];
      let expected = 22.0462;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // precision tolerance
      );
      done();
    })
  });
});