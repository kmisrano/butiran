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
*/
class Polynomial {
	// Constructor
	constructor() {
		this.coefs = [];
		this.length = arguments.length;
		
		var N = this.length;
		var coefs = [];
		if(N > 0) {
			for(var i = 0; i < N; i++) {
				coefs.push(arguments[i]);
			}
		}
		this.coefs = coefs;
	}
};

