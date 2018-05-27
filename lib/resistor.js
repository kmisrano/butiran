/*
	resistor.js
	An object for storing resistance value
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180520
	Create this object as part of components in butiran.
*/

// Define class of Resistor
class Resistor {
	
	// Define constructor
	constructor() {
		// Define default periodic values in one period
		this.value = 0;
		this.type = "";
		
		// Change default value if given as arguments
		if(arguments.length == 1) {
			this.type = "constant";
			this.value = arguments[0];
		} else if(arguments.length == 2) {
			this.type = "variable";
			this.Rmax = arguments[0];
			this.pos = arguments[1];
			this.value = this.Rmax * this.pos;
		} else if(arguments.length == 3) {
			this.type = "time-dependent";
			this.Rmin = arguments[0];
			this.Rmax = arguments[1];
			this.tau = arguments[2];
			this.value = this.Rmin;
			this.V = 0;
		}
	}
	
	// Get value of resistor
	ping() {
		if(this.type == "constant") {
			this.value = this.value;
		} else if(this.type == "variable") {
			this.pos = arguments[0];
			this.value = this.Rmax * this.pos;
		} else if(this.type == "time-dependent") {
			var dt = arguments[0];
			var V = arguments[1];
			var R = this.value;
			//var dV = (V - this.V);
			var dR = 0;
			if(V > 0) {
				dR = (this.Rmax - R) * dt / this.tau;
			} else {
				dR = (this.Rmin - R) * dt / this.tau;
			}
			R += dR;
			//this.V = V;
			this.value = R;
		}
		return this.value;
	}
}

// Export module
module.exports = function() {
	return Resistor;
};
