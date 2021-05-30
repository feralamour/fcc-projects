function ConvertHandler() {
  let regex = /[a-z]+|[^a-z]+/gi; // DRY: split it up

  this.getNum = function(input) {
    let result = input.match(regex)[0];
 
    // whitespace found, return invalid number
    if (/\s/.test(result)) {
      return 'invalid number';
    }
    if (/^\.\d+/.test(result)) {
      result = eval('0' + result);
    }
    // no number provided, default to 1
    if (!/\d/.test(result)) {
      result = 1;
    }

    if (result.toString().includes('/')) {
      let values = result.toString().split('/');
      // check for invalid fractions
      if (values.length != 2) {
        return 'invalid number';
      } else {
        // all good
        result = eval(result);
      }
    }
    // if not a number
    if (isNaN(result)) {
      return 'invalid number';
    }

    return Number(result);
  };
  
  this.getUnit = function(input) {
    let result = input.match(regex)[1];

    // no input number provided
    if (!result) {
      result = input.match(regex)[0];
    }

    // Check for valid units
    let validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    
    if (!validUnits.includes(result)) {
      return 'invalid unit';
    }
    if (result === 'l' || result === 'L') {
      result = 'L';
    } else {
      return result.toLowerCase();
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    switch(initUnit) {
      case 'gal':
      case 'GAL':
        result = 'L';
        break;
      case 'l':
      case 'L':
        result = 'gal';
        break;
      case 'mi':
      case 'MI':
        result = 'km';
        break;
      case 'km':
      case 'KM':
        result = 'mi';
        break;
      case 'lbs':
      case 'LBS':
        result = 'kg';
        break;
      case 'kg':
      case 'KG':
        result = 'lbs';
        break;
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch(unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === 'gal' || initUnit === 'GAL') {
      result = (initNum * galToL).toFixed(5);
    }
    if (initUnit === 'l' || initUnit === "L") {
      result = (initNum / galToL).toFixed(5);
    }
    if (initUnit === 'lbs'|| initUnit === "LBS") {
      result = (initNum * lbsToKg).toFixed(5);
    }
    if (initUnit === 'kg' || initUnit === "KG") {
      result = (initNum / lbsToKg).toFixed(5);
    }
    if (initUnit === 'mi' || initUnit === "MI") {
      result = (initNum * miToKm).toFixed(5);
    }
    if (initUnit === 'km' || initUnit === "KM") {
      result = (initNum / miToKm).toFixed(5);
    }
    
    return Number(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    
    return result;
  };
  
}

module.exports = ConvertHandler;
