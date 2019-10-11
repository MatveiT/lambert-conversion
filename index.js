// A library to convert Lambert72 or Lamber08 to coordinates and back.
// Documentation: http://www.ngi.be/FR/FR2-1-4.shtm

const { lambert72ToCoord, coordToLambert72  } = require('./scripts/script72.js');
const { lambert08ToCoord, coordToLambert08  } = require('./scripts/script08.js');


const toCoord = (lambert, year, precision = 0.001) => {
  if(year === '72'){
    return lambert72ToCoord(lambert, precision);
  }else if(year === '08'){
    return lambert08ToCoord(lambert, precision);
  }else{
    console.log("Your second parameter entry:  " + year);
    throw new Error("ERROR in convertion (Lambert => Coord): The second parameter should be '72' or '08'. ");
  };
};

const toLambert = (coord, year) => {
  if(year === '72'){
    return coordToLambert72(coord);
  }else if(year === '08'){
    return coordToLambert08(coord);
  }else{
    console.log("Your second parameter entry:  " + year);
    throw new Error("ERROR in convertion (Coord => Lambert): The second parameter should be '72' or '08'. ");
  };
};


const convert = {
  toCoord: toCoord,
  toLambert: toLambert
};



module.exports = convert;
