// A library to convert Lambert to coordinates and back.
// Documentation: http://www.ngi.be/FR/FR2-1-4.shtm


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Preliminary functions -------------------------------------------------------

// Array to decimal and back functions -----------------------------------------
/*
const degreeToDecimal = (degreeArray) => {
  return degreeArray[0] + degreeArray[1]/60 + degreeArray[2]/3600;
};

const decimalToArray = (decimalDegree) => {
  let remain1 = decimalDegree % 1;
  let a1 = decimalDegree - remain1;
  let a2 = remain1 * 60;
  let remain2 = a2 % 1;
  a2 = a2 - remain2;
  let a3 = remain2 * 60
  return [a1, a2, a3];
}
*/

// Proximity test between two number with a given precision --------------------

const accuracyTest = (a1, a2, precision) => {
  const diff = a1- a2;
  return diff >= - precision && diff <= precision
};

// Trigonometric functions -----------------------------------------------------
const cos = (angle) => {
  return Math.cos(angle * Math.PI / 180)
};

const sin = (angle) => {
  return Math.sin(angle * Math.PI / 180)
};

const tan = (angle) => {
  return Math.tan(angle * Math.PI / 180)
};

const atan = (real) => {
  return Math.atan(real) * 180 / Math.PI;
}

const pi = 180;




// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Constants -------------------------------------------------------------------

const a = 6378388;
const f = 1 / 297;
// const phi_1Array = [49, 50, 0.00204];
// const phi_2Array = [51, 10, 0.00204];
// const phi_0Array = [90, 0, 0];
// const lambda_0Array = [4, 22, 2.952];
const x_0 = 150000.013;
const y_0 = 5400088.438;
const e_sqrt = 0.006722670022333322;                        // 2*f - f**2
const e = 0.08199188997902977;                              // e_sqrt**0.5
const phi_1 = 49.8333339;                                   // degreeToDecimal(phi_1Array)
const phi_2 = 51.16666723333333;                            // degreeToDecimal(phi_2Array)
const phi_0 = 90;                                           // degreeToDecimal(phi_0Array)
const lambda_0 = 4.367486666666666;                         // degreeToDecimal(lambda_0Array)



// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Constants-based functions ---------------------------------------------------

/*
const mCompute = (d) => {
  return cos(d) / ( (1 - e_sqrt * (sin(d)**2) )**0.5 );
};
*/

const tCompute = (d) => {
  return tan(pi/4 - d/2) / ( ( (1 - e * sin(d)) / (1 + e * sin(d)) )**(e/2) );
};

// const m1 = 0.6462830348799783                            // mCompute(phi_1);
// const m2 = 0.6283400052196867                            // mCompute(phi_2);
// const t1 = 0.36750380900177976                           // tCompute(phi_1);
// const t2 = 0.3543358254169406                            // tCompute(phi_2);
// const t0 = 0                                             // tCompute(phi_0);
const n  = 0.7716421928141346                               // (Math.log(m1) - Math.log(m2)) / (Math.log(t1) - Math.log(t2));
const g  = 1.8132976247017552                               // m1 / (n * (t1**n) );
const r0 = 0                                                // a * g * (t0**n);


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Convertions -----------------------------------------------------------------

const lambert72ToCoord = (lambert, precision) => {
  const x = lambert[0], y = lambert[1];
  const r = ( (x - x_0)**2 + ( -(y - y_0))**2 )**0.5;
  const t = (r / (a * g))**(1/n);
  const theta = atan( (x-x_0)/( -(y - y_0)) )
  const lambda = (theta / n) + lambda_0;
  let phi = pi/2 - 2*atan(t);
  let previousPhi = phi + 1;
  while(!accuracyTest(phi, previousPhi, precision)){
    previousPhi = phi
    phi = pi/2 - 2*atan( t * ( (1 - e * sin(phi) )/(1 + e * sin(phi)) )**(e/2));
  };
  return [lambda, phi];
};

const coordToLambert72 = (lngLat) => {
  const lambda = lngLat[0], phi = lngLat[1];
  const t = tCompute(phi);
  const r = a * g * (t**n);
  const theta = n * (lambda - lambda_0)
  const x = x_0 + r * sin(theta)
  const y = y_0 - r * cos(theta);
  return [x, y];
};


module.exports = { lambert72ToCoord, coordToLambert72  };
