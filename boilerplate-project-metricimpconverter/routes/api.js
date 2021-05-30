'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.route('/api/convert').get((req, res) => {
    //console.log(req.query, "<= req.query")
    let input = req.query.input,
        initNum = convertHandler.getNum(input),
        initUnit = convertHandler.getUnit(input),
        returnNum = convertHandler.convert(initNum, initUnit),
        returnUnit = convertHandler.getReturnUnit(initUnit),
        toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Check for invalid responses  
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.json("invalid number and unit")
    } else if (initUnit === 'invalid unit') {
      res.json('invalid unit');
    } else if (initNum === 'invalid number') {
      res.json('invalid number');
    } else {
      // Everything is valid
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    };
  });
};

