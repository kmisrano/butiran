/*
	spring.js
	Spring force
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180603
	Create this library from previous force.js and
	normal.js libraries.
*/

// Require classes
var Vect3 = require('../vect3')();
var Grain = require('../grain')();

// Define class of Spring
class Spring {
	// Create constructor
	constructor() {
		// Set default spring constant
		this.k = 1; // N m^-1 
		
		// Set default spring uncompressed length
		this.l = 1; // m
		
		// Set default damping constant
		this.gamma = 1; // N s m^-1
		
		// Set default origin
		this.o = new Vect3;
	}
	
	// Set constants
	setConstant(k, gamma) {
		this.k = k;
		this.gamma = gamma;
	}
	
	// Set uncompressed length
	setUncompressedLength(l) {
		this.l = l;
	}
	
	// Set origin
	setOrigin(o) {
		this.o = o;
	}
	
	// Calculate normal force
	force() {
		// Set default value to (0, 0, 0)
		var f = new Vect3;
		if(arguments.length == 1) {
			if(arguments[0] instanceof Grain) {
				var r1 = arguments[0].r;
				var r2 = this.o;
				var r12 = Vect3.sub(r1, r2);
				var u12 = r12.unit();
				var l12 = r12.len();
				var l = this.l;
				var v1 = arguments[0].v;
				var v2 = new Vect3;
				var v12 = Vect3.sub(v1, v2);
				var k = this.k;
				var gamma = this.gamma;
				var ksi = l12 - l;
				var ksidot = v12.len();
				
				f = Vect3.mul(-k * ksi - gamma * ksidot, u12);
			}
		} else if(arguments.length == 2) {
			if(arguments[0] instanceof Grain &&
				arguments[1] instanceof Grain) {
				var r1 = arguments[0].r;
				var r2 = arguments[1].r;
				var r12 = Vect3.sub(r1, r2);
				var u12 = r12.unit();
				var l12 = r12.len();
				var l = this.l;
				var v1 = arguments[0].v;
				var v2 = arguments[1].v;
				var v12 = Vect3.sub(v1, v2);
				var k = this.k;
				var gamma = this.gamma;
				var ksi = l12 - l;
				var ksidot = v12.len();
				
				f = Vect3.mul(-k * ksi - gamma * ksidot, u12);
			}
		}
		
		// Note that (0, 0, 0) value could be due to error
		return f;
	}
}

// Export module -- 20180603.1324 ok
module.exports = function() {
	return Spring;
};
