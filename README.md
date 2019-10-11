# Lambert to Coordinates convertions and back

Here is a minimalistic JavaScript library to convert **Lambert-1972** / **Lambert-2008** to **spherical coordinates** (longitude, latitude) and back. It has no dependencies.
The Lambert-1972 and the Lambert-2008 are systems that are sometimes used to represent **geographical data in Belgium**.
For more information, see:   http://www.ngi.be/FR/FR2-1-4.shtm


In the context we will represent a **spherical coordinate** pair as an **array of length two**. The **first argument** is the **longitude** and the **second argument** in the **longitude**. There values are represented as **decimal values of degrees**. A such convention is for example used in the geojson format.

So for example:
```
const myCoordinates = [ 4.234578445, 50.757854615 ];
```
The Lambert coordinates is also an array of length two with real number inside. The first element represents the X axis and the second the Y axis.
```
const myLambertCoordinates = [ 140621.78169157667, 160763.96707254462 ];
```

### Install

1) You can directly export the function ``convert`` from ``./index.js`` with the code line
`` const convert = require('./DIRECTORY/index.js');``
and use it in your JavaScript code.

2) By using **npm** (node package manager) with the command
``npm install ....``

### Usage

See examples in ``usage.js``.

1) **Coord => Lambert:** To convert a spherical coordinate to Lambert-1978 (or 2008):
```
const year = '72';   // or const year = '08';
const myCoord = [ 4.234578445, 50.757854615 ];
const myLambert = convert.toLambert( myCoord, year );
```

2) **Lambert => Coord:** Then convert it back with:
```
const myCoordBack = convert.toCoord( myLambert, year );
```


3) **Precision**:

The (Lambert => Coordinates) conversion is a **recurrence function** which stops when two consecutive values of the parameter 'phi' are close enough **with a given precision**.
The default values is 0.001, but you can specify it as the third parameter of the convert.toCoord function.
```
const year = '72';   // or const year = '08';
const myLambert = [ 140621.78169157667, 160763.96707254462 ];
const precision = 0.001;
const myCoordinate = convert.toCoord(myLambert, year, precision);
```




- Matsvei Tsishyn (matvei.tsishyn@gmail.com)
