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
	Discrete integer Gaussian distribution (DIGD)
	
	20180909
	Prepare number generator for AMB simulation (ICGAB 2018).
	Functions generateNumber, correctNumber, generateSequence,
	randomizeSequence, getValue are tested.
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
		this.pos = 0;
		
		this.generateNumber();
		this.correctNumber();
		this.generateSequence();
		this.randomizeSequence();
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
	
	// Generate number of data
	generateNumber() {
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
	}
		
	// Correct number of data
	correctNumber() {
		var imin = this.min;
		var imax = this.max;
		var NN = 0;
		for(var i = 0; i < (imax - imin); i++) {
			var nn = this.n[i];
			NN += nn;
		}
		var imid = Math.round((imin + imax) / 2);
		var dn = this.N - NN;
		this.n[imid] += dn;
	}
	
	// Generate sequence
	generateSequence() {
		this.sequence = [];
		var Ni = this.x.length;
		for(var i = 0; i < Ni; i++) {
			var Nj = this.n[i];
			for(var j = 0; j < Nj; j++) {
				this.sequence.push(this.x[i]);
			}
		}
	}
	
	// Randomize sequence
	randomizeSequence() {
		var seq = this.sequence;
		var N = seq.length;
		for(var i = 0; i < N; i++) {
			var src = randInt(0, N - 1);
			var dest = randInt(0, N - 1);
			[seq[src], seq[dest]] = [seq[dest], seq[src]];
		}
	}
	
	// Get value of sequence
	getValue() {
		var value = this.sequence[this.pos];
		this.pos++;
		if(this.pos == this.N) {
			this.pos = 0;
		}
		return value;
	}
}


/*
	Discrete integer reciprocal distribution (DIRD)
	
	20180909
	Create distribution for AMB simulation (ICGAB 2018).
	Functions generateNumber, correctNumber, generateSequence,
	randomizeSequence, getValue are tested.
	Implement different correction procedure as in DIGD.
*/

class DistDiscIntReciprocal {
	// Constructor
	constructor() {
		this.infinity = arguments[0];
		this.min = arguments[1].min;
		this.max = arguments[1].max;
		this.step = arguments[1].step;
		this.N = arguments[1].N;
		this.x = [];
		this.y = [];
		this.n = [];
		this.sequence = [];
		this.pos = 0;
		
		this.generateNumber();
		this.correctNumber();
		this.generateSequence();
		this.randomizeSequence();
	}
	
	// Define Gaussian distribution function
	func(x) {
		var inf = this.infinity;
		var min = this.min;
		var max = this.max;
		var ln1 = Math.log(min - inf);
		var ln2 = Math.log(max - inf);
		var A = 1 / (ln2 - ln1);
		var y = A / (x - inf);
		return y;
	}
	
	// Generate number of data
	generateNumber() {
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
	}
		
	// Correct number of data
	correctNumber() {
		var imin = this.min;
		var imax = this.max;
		var NN = 0;
		for(var i = 0; i < (imax - imin); i++) {
			var nn = this.n[i];
			NN += nn;
		}
		var imid = Math.round((imin + imax) / 2);
		var dn = this.N - NN;
		var Ni = Math.abs(dn);
		for(var i = 0; i < Ni; i++) {
			this.n[i] += Math.sign(dn)
		}
	}
	
	// Generate sequence
	generateSequence() {
		this.sequence = [];
		var Ni = this.x.length;
		for(var i = 0; i < Ni; i++) {
			var Nj = this.n[i];
			for(var j = 0; j < Nj; j++) {
				this.sequence.push(this.x[i]);
			}
		}
	}
	
	// Randomize sequence
	randomizeSequence() {
		var seq = this.sequence;
		var N = seq.length;
		for(var i = 0; i < N; i++) {
			var src = randInt(0, N - 1);
			var dest = randInt(0, N - 1);
			[seq[src], seq[dest]] = [seq[dest], seq[src]];
		}
	}
	
	// Get value of sequence
	getValue() {
		var value = this.sequence[this.pos];
		this.pos++;
		if(this.pos == this.N) {
			this.pos = 0;
		}
		return value;
	}
}

/*
	Plantation growth function (PGF)
	
	20180909
	Create this functions for AMB simulation (ICGAB 2018).
	Functions GrowTemp, GrowWater, Sigmoid, and dSigmoid
	are tested.
*/

// Define temperature dependece growing factor
function GrowTemp(T, TL, TO, TH, c2) {
	var TLO = TL + Math.sqrt((TO - TL)*(TO - TL) + 1/c2);
	var THO = TH - Math.sqrt((TH - TO)*(TH - TO) + 1/c2);
	var val;
	if(T < TL) {
		val = 0
	} else if((TL <= T) && (T < TLO)) {
		var a = c2 * (TLO - TO)*(TLO - TO) + 1;
		var b = T - TL;
		var c = TLO - TL;
		val = a * b / c;
	} else if((TLO <= T) && (T <= THO)) {
		val = 1 + c2 * (T - TO)*(T - TO);
	} else if((THO < T) && (T <= TH)) {
		var a = c2 * (THO - TO)*(THO - TO) + 1;
		var b = T - TH;
		var c = THO - TH;
		val = a * b / c;		
	} else {
		val = 0;
	}
	return val;
}

// Define water dependece growing factor
function GrowWater(H, HL, HH) {
	var val;
	if(H < HL) {
		val = 0
	} else if((HL <= H) && (H < HH)) {
		val = (H - HL) / (HH - HL);
	} else {
		val = 1;
	}
	return val;
}

// Define sigmoid function
function Sigmoid(t, A, b, t0) {
	var B = Math.exp(-b * (t - t0));
	var val = A / (1 + B);
	return val;
}

// Define derivative of sigmoid function
function dSigmoid(t, A, b, t0) {
	var s = Sigmoid(t, A, b, t0);
	var val = s * (1 - s);
	return val;
}

class Plant {
	// Constructor
	constructor() {
		this.tem = arguments[0];
		this.wat = arguments[1];
		this.sig = arguments[2];
		this.maxAge = arguments[3];
		this.lagTime = arguments[4]
		this.size = 0;
		this.age = 0;
		this.tlag = 0;
		this.idle = false;
	}
	
	// Grow plant
	grow() {
		var T = arguments[0];
		var H = arguments[1];
		
		if(this.age < this.maxAge) {
			var tem = this.tem;
			var fT = GrowTemp(T, tem.TL, tem.TO, tem.TH, tem.c2);
			
			var wat = this.wat;
			var fH = GrowWater(H, wat.HL, wat.HH);
			
			var sig = this.sig;
			var fS = dSigmoid(this.age, sig.A, sig.b, sig.t0);
			var dsize = fT * fH * fS;
			
			this.age++;
			this.size += dsize;
		} else {
			if(this.tlag < this.lagTime) {
				this.idle = true;
				this.tlag++
			} else {
				this.replant();
			}
		}
	}
	
	// Replant
	replant() {
		this.age = 0;
		this.size = 0;
		this.tlag = 0;
		this.idle = false;
		console.log("replant");
	}
	
	// Get age
	getAge() {
		var val;
		if(!this.idle) {
			val = this.age;
		} else {
			val = 0;
		}
		return val;
	}
	
	// Get size
	getSize() {
		var val;
		if(!this.idle) {
			val = this.size;
		} else {
			val = 0;
		}
		return val;
	}
}