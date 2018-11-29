/*
	ab_simstp.js
	Simulate role of STP in innovation ecosystem
	
	Sparisoma Viridi | dudung@gmail.com
	
	20181128
	Start this program by modifying ab_phasemat.js.
*/

// Generate integer random number in [min, max]
function randInt(min, max) {
	var x = Math.random() * (max + 1 - min) + min;
	var y = Math.floor(x);
	return y;
}

// Check uniformity of generated number
function checkRandomDist() {
	var N = 10;
	var dist = [];
	dist.length = N;
	dist.fill(0);
	
	var min = 0;
	var max = 9;
	var M = 10000;
	for(var i = 0; i < M; i++) {
		var gen = randInt(min, max);
		dist[gen]++;
	}
	for(var i = 0; i < N; i++) {
		dist[i] = dist[i] / M;
	}
	
	return(dist);
}

// Create zero matrix with dimension rows x cols
function createZeroMatrix(rows, cols) {
	var m = [];
	for(var r = 0; r < rows; r++) {
		var row = [];
		for(var c = 0; c < cols; c++) {
			row.push(0);
		}
		m.push(row);
	}
	return m;
}

// Create initial random position in binary matrix
function fillParticle(xmin, ymin, xmax, ymax, N, mat) {
	var j = 0;
	for(var i = 0; i < N; i++) {
		var x = randInt(xmin, xmax);
		var y = randInt(ymin, ymax);
		if(mat[y][x] == 0) {
			mat[y][x] = 1;
			j++;
		}
	}
	return j;
}

// Create border with value -1
function createBorder(M) {
	var rSize = M.length;
	var cSize = M[0].length;
	for(var y = 0; y < rSize; y++) {
		M[y][0] = -1;
		M[y][cSize - 1] = -1;
	}
	for(var x = 0; x < cSize; x++) {
		M[0][x] = -1;
		M[rSize - 1][x] = -1;
	}
}

// Function draw a matrix on a canvas
function drawMatrixOnCanvasSTPAge(M, C, id) {
	var can = document.getElementById(id);
	var ctx = can.getContext("2d");
	var rSize = M.length;
	var cSize = M[0].length;
	for(var y = 0; y < rSize; y++) {
		for(var x = 0; x < cSize; x++) {
			if(M[y][x] >= 0) {
				var tage = C[y][x];
				var c = Math.floor(1 * (tage / 100) * 255);
				var r = 255 - c
				var g = 255 - c;
				var b = 255 - c;
				
				if(C[y][x] == 0) {
					r = 255;
					g = 255;
					b = 255;
				}
				
				ctx.fillStyle = "rgb("
					+ r + ", "
					+ g + ", "
					+ b + ")";
				
				ctx.fillRect(x, y, 1, 1);
			} else {
				var borderColor = "#abc";
				var r = 100;
				var g = 19;
				var b = 255;
				ctx.fillStyle = borderColor;
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}
}

// Function draw a matrix on a canvas
function drawMatrixOnCanvasSTPType(M, C, id) {
	var can = document.getElementById(id);
	var ctx = can.getContext("2d");
	var rSize = M.length;
	var cSize = M[0].length;
	for(var y = 0; y < rSize; y++) {
		for(var x = 0; x < cSize; x++) {
			if(M[y][x] >= 0) {
				var r, g, b;
				
				var typ = C[y][x];
				switch(typ) {
				case -1: r = 000; g = 000; b = 000; break;
				case +0: r = 255; g = 255; b = 255; break;
				case +1: r = 255; g = 255; b = 000; break;
				case +2: r = 000; g = 255; b = 000; break;
				case +3: r = 000; g = 160; b = 000; break;
				case +4: r = 000; g = 000; b = 255; break;
				case +5: r = 255; g = 000; b = 000; break;
				}
				
				ctx.fillStyle = "rgb("
					+ r + ", "
					+ g + ", "
					+ b + ")";
				
				ctx.fillRect(x, y, 1, 1);
			} else {
				var borderColor = "#abc";
				var r = 100;
				var g = 19;
				var b = 255;
				ctx.fillStyle = borderColor;
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}
}

// Get direction from direction probability
function getDirFromProb(prob) {
	var dx = 0;
	var dy = 0;
	
	var N = prob.length;
	var upper = [];
	upper.length = N;
	
	for(var i = 0; i < N; i++) {
		upper[i] = 0;
		for(var j = 0; j < i + 1; j++) {
			upper[i] += prob[j];
		}
	}
	
	var r = Math.random();
	
	var n = -1;
	for(var i = 0; i < N; i++) {
		if(r < upper[i]) {
			n = i;
			break;
		}
	}
	
	switch(n) {
	case 0: dx = 0; dy = 1; break;
	case 1: dx = 1; dy = 1; break;
	case 2: dx = 1; dy = 0; break;
	case 3: dx = 1; dy = -1; break;
	case 4: dx = 0; dy = -1; break;
	case 5: dx = -1; dy = -1; break;
	case 6: dx = -1; dy = 0; break;
	case 7: dx = -1; dy = 1; break;
	}
	
	return {x: dx, y: dy};
}

// Move particles with some direction probabilities
function moveParticlesWithDirProbsSTP(M, C, T, dirProb) {
	var NR = Math.sqrt(dirProb.length);
	
	var rSize = M.length;
	var cSize = M[0].length;
	var Mi = rSize * cSize;
	for(var i = 0; i < Mi; i++) {
		
		var y = randInt(0, rSize - 1);
		var x = randInt(0, cSize - 1);
		
		var src = M[y][x];
		if(src != -1 && src != 0) {
			
			var xGrid = cSize / NR;
			var yGrid = rSize / NR;
			
			var ry = Math.floor(y / xGrid);
			var rx = Math.floor(x / xGrid);
			var r = ry * NR + rx;
			
			var dir = dirProb[r];
			
			var randDir = getDirFromProb(dir);
			var dx = randDir.x;
			var dy = -randDir.y;
			
			if(y + dy >= 0 && y + dy < rSize &&
				x + dx >= 0 && x + dx < cSize) {
				var dest = M[y + dy][x + dx];
				if(dest == 0) {
					M[y + dy][x + dx] = 1;
					M[y][x] = 0;
					
					C[y + dy][x + dx] = C[y][x];
					C[y][x] = 0;
					
					T[y + dy][x + dx] = T[y][x];
					T[y][x] = 0;
 				}
			}
		}
	}
}

// Create directional fluid flow probability
function createDirProb(dir, prob) {
	var numDir = 8;
	var digit = 4;
	var strcprob = ((1 - prob) / (numDir - 1)).toFixed(digit);
	var cprob = parseFloat(strcprob);
	var dirProb = [];
	dirProb.length = numDir;
	dirProb.fill(cprob);
	dirProb[dir] = prob;
	return dirProb;
}

// Configure visual elements
function configure() {
	// Set document properties
	document.body.style.background = "#eee";
	
	// Set canvas properties
	var can1 = document.createElement("canvas");
	document.body.append(can1);
	can1.id = canId1;
	can1.style.background = background;
	can1.width = width;
	can1.height = height;
	can1.style.width = width + "px";
	can1.style.height = height + "px";
	
	var can2 = document.createElement("canvas");
	document.body.append(can2);
	can2.id = canId2;
	can2.style.background = background;
	can2.width = width;
	can2.height = height;
	can2.style.width = width + "px";
	can2.style.height = height + "px";

	// Set textarea properties
	var ta = document.createElement("textarea");
	document.body.append(ta);
	ta.id = taId;
	ta.style.background = background;
	ta.style.width = (160 + width) + "px";
	ta.style.height = height + "px";
	ta.style.overflowY = "scroll";
	
	// Set button properties
	btn = document.createElement("button");
	document.body.append(btn);
	btn.innerHTML = "Start";
	btn.addEventListener("click", btnClick);
}

// Do something when button is clicked
function btnClick() {
	var cap = event.target.innerHTML;
	if(cap == "Start") {
		cap = "Stop";
		start();
	} else {
		cap = "Start";
		clearInterval(proc);
	}
	event.target.innerHTML = cap;
}

// Fill age distribution
function fillAge(a1, b1, a2, b2, tmid, pos, age) {
	var tmin = 1;
	var tmax = 100;
	var sum1 = 0;
	for(var t = tmin; t <= tmax; t++) {
		var Nt = (t < tmid) ?
			a1 + b1 * t :
			a2 * Math.exp(b2 * (t - tmid));
		sum1 += Nt;
	}
	var A = sum1;
	var sum2 = 0;
	for(var t = tmin; t <= tmax; t++) {
		var Nt = (t < tmid) ?
			a1 + b1 * t :
			a2 * Math.exp(b2 * (t - tmid));
		sum2 += Nt / A;
	}
	
	// Create sequence of age distribution
	var ageSeq = [];
	ageSeq.length = M;
	ageSeq.fill(0);
	
	var NT = tmax - tmin + 1;
	var ageClass = [];
	ageClass.length = NT;
	ageClass.fill(0);
	
	for(var t = tmax; t > tmin; t--) {
		var Nt = (t < tmid) ?
			a1 + b1 * t :
			a2 * Math.exp(b2 * (t - tmid));
		Nt /= A;
		ageClass[t-1] = Math.floor(Nt * M);
	}
	var sum3 = 0;
	for(var t = tmin; t <= tmax; t++) {
		sum3 += ageClass[t-1];
	}
	
	// Force the difference to first class
	ageClass[0] = M - sum3;
	var sum4 = 0;
	for(var t = tmin; t <= tmax; t++) {
		sum4 += ageClass[t-1];
	}
	
	// Disribute ages to matrix
	var t = 0;
	var Nit = ageClass[t];
	var it = 0;
	for(var r = 0; r < rowSize; r++) {
		for(var c = 0; c < colSize; c++) {
			if(pos[r][c] == 1) {
				if(it >= Nit) {
					t++;
					Nit += ageClass[t]
				}
				age[r][c] = t + 1;
				it++;
			}
		}
	}
}

// Refill type distribution
function refillType(NO, NS, NA, NE, NR, A, T) {
//                   1   2   3   4   5
/*
	ts = 19;
	TU = 5;
	TW = 3;
	tR = 55;
	TI = 30;
*/
	for(var y = 0; y < rowSize; y++) {
		for(var x = 0; x < colSize; x++) {
			var age = A[y][x];
			var type = 0;
			if(age > 0) {
				if(age <= ts) {
					// Type of Original
					type = 1;
				} else if(ts < age && age <= ts + TU) {
					// Type of Student
					type = 2;
				} else if(ts + TU < age && age <= ts + TU + TW) {
					// Type of Alumni
					type = 3;
				} else if(ts + TU + TW < age && age <= tR) {
					// Type of Employee
					type = 4;
				} else {
					// Type of Retiree
					type = 5;
				}
				
				T[y][x] = type;
			}
		}
	}
}

// Initialize parameters
function initialize() {
	// Set size of system matrix
	rowSize = 100;
	colSize = 100;
	pos = createZeroMatrix(rowSize, colSize);
	age = createZeroMatrix(rowSize, colSize);
	typ = createZeroMatrix(rowSize, colSize);

	// Set particles initial position
	N = 10000;
	xmin = 20;
	ymin = 20;
	xmax = 80;
	ymax = 80;
	M = fillParticle(xmin, ymin, xmax, ymax, N, pos);
	
	// Create system border
	createBorder(pos);
	
	// Generate age distribution
	var a1 = 50;
	var b1 = -0.025;
	var a2 = 50;
	var b2 = -0.08;
	var tmid = 42;
	fillAge(a1, b1, a2, b2, tmid, pos, age);
	
	// Set iteration parameters
	period = 10;
	tbeg = 0;
	tend = 365 * 10;
	dt = 1;
	t = tbeg;

	// Define probabilities for single phase
	var pGas = [
		0.125, 0.125, 0.125, 0.125, 
		0.125, 0.125, 0.125, 0.125
	];
	var pLiq = [
		0.060, 0.110, 0.110, 0.125, 
		0.250, 0.125, 0.110, 0.110
	];
	var pGra = [
		0.000, 0.000, 0.000, 0.250,
		0.500, 0.250, 0.000, 0.000
	];
	var pSol = [
		0.000, 0.000, 0.000, 0.000,
		1.000, 0.000, 0.000, 0.000		
	];
	
	// Define probabilities for fluid flow in eight directions
	var pNO = createDirProb(0, 0.650);
	var pNE = createDirProb(1, 0.650);
	var pEA = createDirProb(2, 0.650);
	var pSE = createDirProb(3, 0.650);
	var pSO = createDirProb(4, 0.650);
	var pSW = createDirProb(5, 0.650);
	var pWE = createDirProb(6, 0.650);
	var pNW = createDirProb(7, 0.650);
	var pIS = createDirProb(0, 0.125);

	// Wrap it to a directional probability
	switch(phase) {
	case 20: 
		probs = [
			pNE, pEA, pSE, pNE, pEA, pSE,
			pNO, pIS, pSO, pNO, pIS, pSO,
			pNW, pWE, pIS, pIS, pWE, pSW,
			pNE, pEA, pIS, pIS, pEA, pSE,
			pNO, pIS, pSO, pNO, pIS, pSO,
			pNW, pWE, pSW, pNW, pWE, pSW
		];
	break;
	}
	
	// Set visual elements properties
	canId1 = "canvas1";
	canId2 = "canvas2";
	taId = "textarea1";
	width = 100;
	height = 100;
	background = "#fff";
	
	// Set STP values
	ts = 19;
	TU = 5;
	TW = 3;
	tR = 55;
	TI = 30;
	TG = 360;
	iTG = 0;
	triggered = false;
	TT = 30 * 6;
	iTT = 0;
	transformed = false;
	STP = [10, 10, 100, 100];
	prod = 0;
	probChange = 0.5;
	probProd = 0.5;
	
	// Generate type distribution
	var NO = M;
	var NS = 0;
	var NA = 0;
	var NE = 0;
	var NR = 0;
	refillType(NO, NS, NA, NE, NR, age, typ);
	
	// Set output data properties
	outData = true;
	iData = 0;
	TData = 30;
}

// Increase age of all agents
function translateAgent(A) {
	for(var y = 0; y < rowSize; y++) {
		for(var x = 0; x < colSize; x++) {
			if(triggered && A[y][x] > 0) {
				A[y][x]++;
			}
		}
	}
}

// Transform type of all agents
function transformAgent(A, T) {
	for(var y = 0; y < rowSize; y++) {
		for(var x = 0; x < colSize; x++) {
			var age = A[y][x];
			var type = T[y][x];
			
			if(transformed && age > 0) {
				if(age <= ts) {
					// Type of Original
					type = 1;
				} else if(ts < age && age <= ts + TU) {
					// Type of Student
					type = 2;
				} else if(ts + TU < age && age <= ts + TU + TW) {
					// Type of Alumni
					type = 3;
				} else if(ts + TU + TW < age && age <= tR) {
					// Type of Employee
					type = 4;
				} else {
					// Type of Retiree
					type = 5;
				}
				// Transform if possible
				if(Math.random() < probChange) {
					T[y][x] = type;
				}
			}
		}
	}	
}

// Get innovation
function getInnovationFromAgent(STP, typ) {
	var xmin = STP[0];
	var xmax = STP[2];
	var ymin = STP[1];
	var ymax = STP[3];
	
	var oprod = 0;

	for(var y = 0; y < rowSize; y++) {
		for(var x = 0; x < colSize; x++) {
			if(typ[y][x] == 4) {
				var inXRange = (xmin < x) && (x < xmax);
				var inYRange = (ymin < y) && (y < ymax);
				var inRange = inXRange && inYRange;
				if(inRange) {
					if(Math.random() < probProd) {
						oprod++;
					}					
				}
			}
		}
	}
	
	return oprod;
}

// Get type distribution in string
function getStrDistType(T) {
	var types = [];
	types.length = 5;
	types.fill(0);
	for(var y = 0; y < rowSize; y++) {
		for(var x = 0; x < colSize; x++) {
			var typ = T[y][x];
			if(typ > 0) {
				types[typ - 1]++;
			}
		}
	}
	
	var Ntypes = types.length;
	var str = "";
	for(var i = 0; i < Ntypes; i++) {
		str += types[i];
		if(i < Ntypes - 1);
		str += " ";
	}
	return str;
}

// Add string to a textarea
function addStringToTextarea(string, id) {
	var ta = document.getElementById(id);
	ta.value += string;
	ta.scrollTop = ta.scrollHeight;
}

// Perform simulation
function simulate() {
	// Draw position matrix on canvas
	drawMatrixOnCanvasSTPAge(pos, age, canId1);
	drawMatrixOnCanvasSTPType(pos, typ, canId2);
	
	if(iData >= TData || iData == 0) {
		iData = 0;
		outData = true;
	} else {
		outData = false;
	}
	
	// Add time series information to textarea
	if(outData) {
		var strDistType = getStrDistType(typ);
		var str = t + "  " + strDistType + " " + prod + "\n";
		addStringToTextarea(str, taId);
	}
	
	// Change particles state
	moveParticlesWithDirProbsSTP(pos, age, typ, probs);
	
	// Change age
	translateAgent(age);
	
	// Transform type
	transformAgent(age, typ);
	
	// Get innovation
	var dprod = getInnovationFromAgent(STP, typ);
	prod += dprod;
		
	if(iTG >= TG) {
		iTG = 0;
		triggered = true;
	} else {
		triggered = false;
	}
	
	if(iTT >= TT) {
		iTT = 0;
		transformed = true;
	} else {
		transformed = false;
	}
	
	// Increase time
	t += dt;
	iTG++;
	iTT++;
	iData++;
	
	// Terminate simulation if final condition achieved
	if(t > tend) {
		clearInterval(proc);
	}
}

// Start simulation
function start() {
	// Call simulate with period time in ms
	proc = setInterval(simulate, period);
}

// Define global variables
var rowSize, colSize, pos, age, typ;
var N, xmin, ymin, xmax, ymax, M;
var period, tbeg, tend, dt, t;
var probs;
var proc;
var canId1, canId2, taId, width, height, background;
var phase;

// Define STP variables
var ts, TU, TW, tR, TI;
var TG, iTG, triggered;
var TT, iTT, transformed;
var STP, probChange, prod, probProd;

// Define Data period
var iData, TData, outData;

// Execute this program
function main() {
	// Visulize ABM for STP simulation
	phase = 20;
	
	// Initialize values
	initialize();
	
	// Configure visual elements
	configure();
	
	// Output something
	console.log(M);
}

// Call main function
main();
