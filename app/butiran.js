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
	20180909
	Start the ABM with designing number generator.
*/

/*
	Polynomial
	
	20180906
	Redefine class of Polynomial to get better consistency in
	writing the code.
	Define and test constructor, dif, int, mul, div (zu Hause)
	Fix int without explicit boundary condition,
	continue add, sub, mul (and der Uni).
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
		var p = arguments[0];
		var c0 = arguments[1];
		var N = p.length;
		var c = p.coefs;
		var coefs = [];
		coefs[0] = (c0 != undefined) ? c0 : 0;
		for(var i = 0; i < N; i++) {
			coefs[i + 1] =  c[i] / (i + 1);
		}
		var pint = new Polynomial(coefs);
		return pint;
	}
	
	// Multiply a polynomial with a number
	static mul() {
		if(typeof arguments[1] == "number") {
			var p = arguments[0];
			var N = p.length;
			var c = p.coefs;
			var d = arguments[1];
			var cmul = [];
			for(var i = 0; i < N; i++) {
				cmul[i] =  d * c[i];
			}
			var pmul = new Polynomial(cmul);
			return pmul;
		} else {
			var p1 = arguments[0];
			var N1 = p1.length;
			var p2 = arguments[1];
			var N2 = p2.length;
			var c1 = p1.coefs;
			var c2 = p2.coefs;
			var N = N1 + N2 - 1;
			var coefs = [];
			for(var i = 0; i < N; i++) {
				var d = 0;
				for(var j = 0; j <= i; j++) {
					var d1 = c1[j];
					var d2 = c2[i - j];
					d1 = (d1 != undefined) ? d1 : 0;
					d2 = (d2 != undefined) ? d2 : 0;
					var dd = d1 * d2;
					d += dd
				}
				coefs[i] = d;
			}
			var pmul = new Polynomial(coefs);
			return pmul;
		}
	}
	
	// Divide a polynomial with a number
	static div() {
		var p = arguments[0];
		var N = p.length;
		var c = p.coefs;
		var d = arguments[1];
		var cdiv = [];
		for(var i = 0; i < N; i++) {
			cdiv[i] =  c[i] / d;
		}
		var pdiv = new Polynomial(cdiv);
		return pdiv;
	}
	
	// Add two polynomials
	static add() {
		var p1 = arguments[0];
		var N1 = p1.length;
		var p2 = arguments[1];
		var N2 = p2.length;
		var N = (N1 >= N2) ? N1 : N2;
		var c1 = p1.coefs;
		var c2 = p2.coefs;
		var cadd = [];
		for(var i = 0; i < N; i++) {
			c1[i] = (c1[i] != undefined) ? c1[i] : 0;
			c2[i] = (c2[i] != undefined) ? c2[i] : 0;
			cadd[i] = c1[i] + c2[i];
		}
		var padd = new Polynomial(cadd);
		return padd;
	}
	
	// Substract two polynomials
	static sub() {
		var p1 = arguments[0];
		var N1 = p1.length;
		var p2 = arguments[1];
		var N2 = p2.length;
		var N = (N1 >= N2) ? N1 : N2;
		var c1 = p1.coefs;
		var c2 = p2.coefs;
		var csub = [];
		for(var i = 0; i < N; i++) {
			c1[i] = (c1[i] != undefined) ? c1[i] : 0;
			c2[i] = (c2[i] != undefined) ? c2[i] : 0;
			csub[i] = c1[i] - c2[i];
		}
		var psub = new Polynomial(csub);
		return psub;
	}
	
	// Calculate value of a polynomial
	val() {
		if(arguments.length == 0) {
			return 0;
		} else {
			var x = arguments[0];
			var c = this.coefs;
			var fx = 0;
			var N = this.length;
			for(var i = 0; i < N; i++) {
				var dfx = c[i] * Math.pow(x, i);
				fx += dfx;
			}
			return fx;
		}
	}
}


/*
	Random number generator
	
	20180302
	Create this library of functions.
	20180909
	Integrate randInt and randIntN functions, which is
	previously in random.js, into butiran.js file.
*/

// Generate int \in [min, max]
function randInt(min, max) {
	var x = Math.random() * (max - min) + min;
	x = Math.round(x);
	return x;
}

// Generate array of N number of int
function randIntN(min, max, N) {
	var x = [];
	for(var i = 0; i < N; i++) {
		x.push(randInt(min, max));
	}
	return x;
}


/*
	Discrete integer Gaussian distribution
	
	20180909
	Prepare number generator for AMB simulation (ICGAB 2018).
*/

class DistDiscIntGaussian {
	// Constructor
	constructor() {
		this.mu = arguments[0];
		this.sigma = arguments[1];
		this.min = arguments[2].min;
		this.max = arguments[2].max;
		this.step = arguments[2].step;
		this.N = arguments[2].N;
		this.x = [];
		this.y = [];
		this.n = [];
		this.sequence = [];
		
		this.generateData();
	}
	
	// Define Gaussian distribution function
	func(x) {
		var m = this.mu;
		var s = this.sigma;
		var sp = Math.sqrt(2 * Math.PI);
		var A = 1 / (s * sp);
		var x_m2 = (x - m) * (x - m);
		var b = 2 * s * s;
		var y = A * Math.exp(-x_m2 / b);
		return y;
	}
	
	// Generate data
	generateData() {
		var imin = this.min;
		var imax = this.max;
		var di = this.step;
		for(var i = imin; i <= imax; i += di) {
			var xx = i;
			var yy = this.func(xx);
			var nn = Math.round(this.N * yy);
			this.x.push(xx);
			this.y.push(yy);
			this.n.push(nn);
		}
		
	// Correct number of data
	correctDataNumber() {
		var imin = this.min;
		var imax = this.max;
		var NN = 0;
		for(var i = 0; i < (imax - imin); i++) {
			var xx = i;
			var yy = this.func(xx);
			var nn = Math.round(this.N * yy);
			this.x.push(xx);
			this.y.push(yy);
			this.n.push(nn);
			NN += nn;
		}
		var imid = Math.round((imin + imax) / 2);
		var dn = this.N - NN;
		this.n[imid] += dn;
	}
	
	
}
