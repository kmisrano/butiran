/*
	butiran.js
	JS library for simulation of granula system
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180519
	Recreate this library, see ./sandbox/butiran_old.js for
	previous attempts.
*/

const Polynomial = require('./math/polynomial.js')

var poly = new Polynomial([0, 0, 1]);
console.log(poly.value(3));
