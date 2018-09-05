/*
	butiran.js
	Simulation of physical system based on granular particles
	(en: granular particle, id: butiran)
	
	URL https://github.com/dudung/butiran
	
	Sparisoma Viridi | dudung@gmail.com
		
	20180905
	Recreate this library and merge all into this single file
	in order to simplify maintenance.
	20180906
	Confuse in naming convention of variables, functions, and
	filenames.
*/

/*
	Polynomial
	
	20180906
	Redefine class of Polynomial to get better consistency in
	writing the code.
	Define and test constructor, dif, int, mul, div.
*/
class Polynomial {
	// Constructor
	constructor() {
		this.coefs = arguments[0];
		this.length = this.coefs.length;
	}
	
	// Differentiate a polynomial
	static dif() {
		var oldp = arguments[0];
		var N = oldp.length - 1;
		var oldcs = oldp.coefs;
		var newcs = [];
		for(var i = 0; i < N; i++) {
			newcs[i] = (i + 1) * oldcs[i + 1];
		}
		var newp = new Polynomial(newcs);
		return newp;
	}
	
	// Integrate a polynomial
	static int() {
		var oldp = arguments[0];
		var c0 = arguments[1];
		var N = oldp.length;
		var oldcs = oldp.coefs;
		var newcs = [];
		newcs[0] = c0;
		for(var i = 0; i < N; i++) {
			newcs[i + 1] =  oldcs[i] / (i + 1);
		}
		var newp = new Polynomial(newcs);
		return newp;
	}
	
	// Multiply a polynomial with a number
	static mul() {
		var oldp = arguments[0];
		var N = oldp.length;
		var oldcs = oldp.coefs;
		var c = arguments[1];
		var newcs = [];
		for(var i = 0; i < N; i++) {
			newcs[i] =  c * oldcs[i];
		}
		var newp = new Polynomial(newcs);
		return newp;
	}
	
	// Divide a polynomial with a number
	static div() {
		var oldp = arguments[0];
		var N = oldp.length;
		var oldcs = oldp.coefs;
		var c = arguments[1];
		var newcs = [];
		for(var i = 0; i < N; i++) {
			newcs[i] =  oldcs[i] / c;
		}
		var newp = new Polynomial(newcs);
		return newp;
	}
}
