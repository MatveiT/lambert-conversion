const convert = require('./index.js');

console.log("\n=================================================================");
console.log("Lambert 72 ======================================================");

// -----------------------------------------------------------------------------
// Let us define a coordinate point as an array of length two [lng, lat]
const coord1 = [4.23, 50.75];
console.log("\nWe define a coordinate point: ");
console.log(coord1);

// -----------------------------------------------------------------------------
// Convert it to Lambert72
const lamb1 = convert.toLambert(coord1, '72');
console.log("\nHere is its values in Lambert72: ");
console.log(lamb1);

// -----------------------------------------------------------------------------
const coordBack1 = convert.toCoord(lamb1, '72');
console.log("\nHere we convert it back to coordinates: ");
console.log(coordBack1);










console.log("\n\n\n=================================================================");
console.log("Lambert 08 ======================================================");

// -----------------------------------------------------------------------------
// Let us define a coordinate point as an array of length two [lng, lat]
const coord2 = [4.23, 50.75];
console.log("\nWe define a coordinate point: ");
console.log(coord2);

// -----------------------------------------------------------------------------
// Convert it to Lambert72
const lamb2 = convert.toLambert(coord2, '08');
console.log("\nHere is its values in Lambert08: ");
console.log(lamb2);

// -----------------------------------------------------------------------------
const coordBack2 = convert.toCoord(lamb2, '08');
console.log("\nHere we convert it back to coordinates: ");
console.log(coordBack2);










console.log("\n\n\n=================================================================");
console.log("Precision =======================================================");
console.log("\n(Lambert => Coordinates) convertion is a recurrence function \n whith stops when two consecutive values of the parameter 'phi' are close enough.");
console.log("See in http://www.ngi.be/FR/FR2-1-4.shtm.");
console.log("The default values is 0.001, but you can specify it as the third parameter of the convert.toCoord function.");


// -----------------------------------------------------------------------------
// Let us define a coordinate point as an array of length two [lng, lat]
const coord3 = [4.23, 50.75];
console.log("\nInitial Coordinates: ");
console.log(coord3);

// -----------------------------------------------------------------------------
// Convert it to Lambert72
const lamb3 = convert.toLambert(coord3, '72');

// -----------------------------------------------------------------------------
console.log("\nCoordinate again: ");
const { haversine } = require('./scripts/FN.js');
let precision = 1;
for(let i = 0; i < 10; i ++){
  const coordBack3 = convert.toCoord(lamb1, '72', precision);
  console.log("\nPrecision = " + precision +": ");
  console.log(coordBack1);
  console.log("Error: " + haversine(coord3, coordBack3) + " meters.");
  precision /= 10;
};


console.log(convert.toLambert([4.234578445, 50.757854615], '72'))
