// This file is not used by the library but only to measure error in the usage.js precision demonstration

// conversion function from degrees° to radian ---------------------------------
const degToRad = deg => {
  return (deg * Math.PI) / 180;
};

// conversion function from radian to degrees° ---------------------------------
const radToDeg = rad => {
  return (rad * 180) / Math.PI;
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Compute the exact distance between two coordinates points -------------------
const EARTH_DIAMETER = 12742e3;
const haversine = ([lg1, lt1], [lg2, lt2]) => {
  var phi1 = degToRad(lt1);
  var phi2 = degToRad(lt2);
  var dphi = phi2 - phi1;
  var dlambda = degToRad(lg2 - lg1);
  return (
    EARTH_DIAMETER *
    Math.asin(
      Math.sqrt(
        Math.sin(dphi / 2) ** 2 +
          Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlambda / 2) ** 2
      )
    )
  );
};


module.exports = { haversine };
