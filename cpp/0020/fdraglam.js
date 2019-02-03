/*
	fdraglam.js
	Drag force on spherical grains from laminar flow
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Include: <script src="fdraglam.js"></script> in a HTML file
	Execute: Refresh web browser viewing the HTML file
	
	20190203
	1654 Beg zuhause, derived from rbccoll.js file.
*/

// Define global variables
var L, R;
var w1, w2, w3, w4, w5, w6, w7, w8;
var WL, WR, WT, WB;
var wL, wR, wT, wB;
var wall, Nw, kw;
var rho, eta;
var g;
var Db, rhob, ball, Nb, kb; 

var inp;

// Execute main function
main();


// Define main function
function main() {
	setElementsLayout();
	
	initParams();
}

// Initialize all parameters
function initParams() {
	// Define box size, width = 2R, height = L
	R = 0.05; // m
	L = 0.50; // m
	
	// Define 8 points for box corners
	w1 = new Vect3(R, -R, 0);
	w2 = new Vect3(R, R, 0);
	w3 = new Vect3(-R, -R, 0);
	w4 = new Vect3(-R, R, 0);
	w5 = new Vect3(R, -R, L);
	w6 = new Vect3(R, R, L);
	w7 = new Vect3(-R, -R, L);
	w8 = new Vect3(-R, R, L);
	
	// Define 4 walls using previous points
	WL = [w1, w3, w7, w5];
	WR = [w2, w6, w8, w4];
	WT = [w5, w7, w8, w6];
	WB = [w1, w2, w4, w3];
	wall = [WL, WR, WT, WB];
	Nw = wall.length;
	kw = 1E4; // N.m^-1
	
	// Calculate center of each wall
	wL = vect3Average(WL);
	wR = vect3Average(WR);
	wT = vect3Average(WT);
	wB = vect3Average(WB);
	
	// Use water properties
	rho = 1000; // kg.m^-3
	eta = 8.90E-4; // Pa.s
	
	// Use earth gravity
	g = 9.80665;// m.s^-2
	
	// Define grains properties
	Db = [0.01, 0.02, 0.03, 0.04]; // m
	rhob = [2000, 2000, 2000, 2000]; // kg.m^-3
	ball = [
		new Vect3(0, 0.02, Db[0]), // m
		new Vect3(0, 0.04, Db[1]), // m
		new Vect3(0, 0.06, Db[2]), // m
		new Vect3(0, 0.08, Db[3]) // m
	];
	Nb = ball.length;
	kb = 1E4; // N.m^-1
}

// Average some Vect3s
function vect3Average() {
	var r = arguments[0];
	var N = r.length;
	var c = new Vect3;
	for(var i = 0; i < N; i++) {
		c = Vect3.add(c, r[i]);
	}
	c = Vect3.div(c, N);
	return c;
}

// Set layout of all elements
function setElementsLayout() {
	inp = document.createElement("input");
	inp.type = "range";
	inp.style.transform = "rotate(270deg)";
	document.body.append(inp);
}





/*
// Below lines are from rbccoll.js -- 20190108

// Declare program variables
var pname;
var taIn, caOut, taOut0, taOut1;
var btClear, btLoad, btRead, btStart, btInfo;
var Dg, rhog, mg, Ng;
var kS0, kS1, kS2, gP, kP, kV, etaF, velF, temF, kN, pout;
var tbeg, tend, dt, Tdata, Tproc, t, iData, NData, digit;
var xmin, ymin, xmax, ymax;
var proc;
var r0 = [], v0 = [], L0 = [], pin0, LC0 = [];
var r1 = [], v1 = [], L1 = [], pin1, LC1 = [];

// Define main function
function main() {
	// Initialize program variables
	pname = "rbccoll.js";
	taIn = "params";
	caOut = "visual"
	taOut0 = "grains"
	taOut1 = "time"
	btClear = "clear";
	btLoad = "load";
	btRead = "read";
	btStart = "start";
	btInfo = "info";
	
	// Execute some functions
	console.log(pname);
	setElementsLayout(
		taIn, caOut, taOut0, taOut1,
		btClear, btLoad, btRead, btStart, btInfo
	);
}

// Perform simulation
function simulate() {
	// Declare sum of forces
	var F0 = [], F1 = [];
	for(var i = 0; i < Ng; i++) {
		F0[i] = new Vect3;
		F1[i] = new Vect3;
	}
	
	// Calculate spring force in an RBC
	for(var i = 0; i < Ng; i++) {
		var neigh = [-2, -1, 1, 2];
		var Nk = neigh.length;
		for(var k = 0; k < Nk; k++) {
			var j = i + neigh[k];
			if(j < 0) {
				j += Ng;
			} else if(j > Ng - 1) {
				j -= Ng;
			}
			var rg = Vect3.sub(r0[i], r0[j]);
			var lg = rg.len();
			var ug = rg.unit();
			var dL = lg - L0[i][k];
			var dF0 = Vect3.mul(-kN * dL, ug);
			F0[i] = Vect3.add(F0[i], dF0);
		}
	}
	for(var i = 0; i < Ng; i++) {
		var neigh = [-2, -1, 1, 2];
		var Nk = neigh.length;
		for(var k = 0; k < Nk; k++) {
			var j = i + neigh[k];
			if(j < 0) {
				j += Ng;
			} else if(j > Ng - 1) {
				j -= Ng;
			}
			var rg = Vect3.sub(r1[i], r1[j]);
			var lg = rg.len();
			var ug = rg.unit();
			var dL = lg - L0[i][k];
			var dF1 = Vect3.mul(-kN * dL, ug);
			F1[i] = Vect3.add(F1[i], dF1);
		}
	}
	
	// Calculate pressure force
	var rc0 = new Vect3;
	var vc0 = new Vect3;
	for(var i = 0; i < Ng; i++) {
		rc0 = Vect3.add(rc0, r0[i]);
		vc0 = Vect3.add(vc0, v0[i]);
	}
	rc0 = Vect3.div(rc0, Ng);
	vc0 = Vect3.div(vc0, Ng);
	var A0 = 0;
	for(var i = 0; i < Ng; i++) {
		var j = i + 1;
		if(j < 0) {
			j += Ng;
		} else if(j > Ng - 1) {
			j -= Ng;
		}
		var p = Vect3.sub(r0[i], rc0);
		var l = Vect3.sub(r0[j], rc0);
		var dA = Vect3.cross(p, l).len();
		A0 += dA;
	}
	pin0 = gP * temF / A0;
	for(var i = 0; i < Ng; i++) {
		var jm = i - 1;
		if(jm < 0) {
			jm += Ng;
		} else if(jm > Ng - 1) {
			jm -= Ng;
		}
		var jp = i + 1;
		if(jp < 0) {
			jp += Ng;
		} else if(jp > Ng - 1) {
			jp -= Ng;
		}
		var jpm = Vect3.sub(r0[jp], r0[jm]);
		var jci = Vect3.sub(rc0, r0[i]);
		var aa = Vect3.cross(Vect3.cross(jpm, jci), jpm);
		var ua = aa.unit();
		var dF0 = Vect3.mul(-kP * (pin0 - pout) * jpm.len(), ua);
		F0[i] = Vect3.add(F0[i], dF0);
	}
	var rc1 = new Vect3;
	var vc1 = new Vect3;
	for(var i = 0; i < Ng; i++) {
		rc1 = Vect3.add(rc1, r1[i]);
		vc1 = Vect3.add(vc1, v1[i]);
	}
	rc1 = Vect3.div(rc1, Ng);
	vc1 = Vect3.div(vc1, Ng);
	var A1 = 0;
	for(var i = 0; i < Ng; i++) {
		var j = i + 1;
		if(j < 0) {
			j += Ng;
		} else if(j > Ng - 1) {
			j -= Ng;
		}
		var p = Vect3.sub(r1[i], rc1);
		var l = Vect3.sub(r1[j], rc1);
		var dA = Vect3.cross(p, l).len();
		A1 += dA;
	}
	pin1 = gP * temF / A1;
	for(var i = 0; i < Ng; i++) {
		var jm = i - 1;
		if(jm < 0) {
			jm += Ng;
		} else if(jm > Ng - 1) {
			jm -= Ng;
		}
		var jp = i + 1;
		if(jp < 0) {
			jp += Ng;
		} else if(jp > Ng - 1) {
			jp -= Ng;
		}
		var jpm = Vect3.sub(r1[jp], r1[jm]);
		var jci = Vect3.sub(rc1, r1[i]);
		var aa = Vect3.cross(Vect3.cross(jpm, jci), jpm);
		var ua = aa.unit();
		var dF1 = Vect3.mul(-kP * (pin1 - pout) * jpm.len(), ua);
		F1[i] = Vect3.add(F1[i], dF1);
	}
	
	// Calculate internal structure force
	for(var i = 0; i < Ng; i++) {
		var rg = Vect3.sub(r0[i], rc0);
		var lg = rg.len();
		var ug = rg.unit();
		var dL = lg - LC0[i];
		var dF0 = Vect3.mul(-kS0 * dL, ug);
		F0[i] = Vect3.add(F0[i], dF0);
	}
	for(var i = 0; i < Ng; i++) {
		var rg = Vect3.sub(r1[i], rc1);
		var lg = rg.len();
		var ug = rg.unit();
		var dL = lg - LC1[i];
		var dF1 = Vect3.mul(-kS0 * dL, ug);
		F1[i] = Vect3.add(F1[i], dF1);
	}
	
	// Calculate collsion forces between two RBCs
	for(var i0 = 0; i0 < Ng; i0++) {
		for(var i1 = 0; i1 < Ng; i1++) {
			var rg = Vect3.sub(r0[i0], r1[i1]);
			var lg = rg.len();
			var ksi = Math.max(0, Dg - lg)
			var ug = rg.unit();
			var dF0 = Vect3.mul(kN * ksi, ug);
			F0[i0] = Vect3.add(F0[i0], dF0);
		}
	}
	for(var i1 = 0; i1 < Ng; i1++) {
		for(var i0 = 0; i0 < Ng; i0++) {
			var rg = Vect3.sub(r1[i1], r0[i0]);
			var lg = rg.len();
			var ksi = Math.max(0, Dg - lg)
			var ug = rg.unit();
			var dF1 = Vect3.mul(kN * ksi, ug);
			F1[i1] = Vect3.add(F1[i1], dF1);
		}
	}
	
	// Calculate viscous force
	for(var i0 = 0; i0 < Ng; i0++) {
		var dF0 = new Vect3;
		F0[i0] = Vect3.add(F0[i0], dF0);
	}
	for(var i1 = 0; i1 < Ng; i1++) {
		var dF1 = new Vect3;
		F1[i1] = Vect3.add(F1[i1], dF1);
	}
	
	// Check count for displaying output
	if(iData == NData) {
		
		var tout = document.getElementById(taOut0);
		tout.value += t.toFixed(digit) + "\t";
		tout.value += rc0.x.toFixed(digit) + "\t";
		tout.value += rc1.x.toFixed(digit) + "\t";
		tout.value += vc0.x.toFixed(digit) + "\t";
		tout.value += vc1.x.toFixed(digit) + "\t";
		tout.value += A0.toFixed(digit) + "\t";
		tout.value += A1.toFixed(digit) + "\n";
		tout.scrollTop = tout.scrollHeight;
		
		drawGrains();
		
		// Reset count
		iData = 0;
	}
	iData++;
	
	// Implement Euler method
	for(var i = 0; i < Ng; i++) {
		var a0 = Vect3.div(F0[i], mg);
		v0[i] = Vect3.add(v0[i], Vect3.mul(a0, dt));
		r0[i] = Vect3.add(r0[i], Vect3.mul(v0[i], dt));
		
		var a1 = Vect3.div(F1[i], mg);
		v1[i] = Vect3.add(v1[i], Vect3.mul(a1, dt));
		r1[i] = Vect3.add(r1[i], Vect3.mul(v1[i], dt));
	}
	
	// Increase time
	t += dt;
	
	// Terminate process
	if(t > tend + dt) {
		clearInterval(proc);
		document.getElementById(btStart).innerHTML = "Start";
		document.getElementById(btStart).disabled = true;
		document.getElementById(btRead).disabled = false;
		document.getElementById(taIn).disabled = false;
		document.getElementById(taOut0).value += "\n";
	}
}

// Oval Cassini modified by Canham
function ovalCassiniCanham(x) {
	var A = 5.0;
	var B = 0.5;
	var C = 5.05;
	var C4 = C * C * C * C;
	var A2 = A * A;
	var x2 = x * x;
	var sqrt0 = Math.sqrt(C4 + 4 * A2 * x2);
	var sqrt1 = Math.sqrt(sqrt0 - A2 - x2);
	var y = B * sqrt1;
	return y;
}

// Create RBC0 adn RBC1
function createRBCs() {
	console.log("Creating RBCs..");
	
	var sx = 7.3;
	var sy = 0;
	
	// Create 1st RBC
	var N0 = Ng;
	var x0min = -7.1;
	var x0max = 7.1;
	var dx0 = (x0max - x0min) / (N0/2 - 2);
	var x0 = [];
	var y0 = [];
	x0[0] = x0min;
	y0[0] = 0;
	for(var i = 1; i < N0/2; i++) {
		x0[i] = x0min + (i - 1) * dx0;
		y0[i] = ovalCassiniCanham(x0[i]);
	}
	x0[N0/2] = x0max;
	y0[N0/2] = 0;
	for(var i = N0/2 + 1; i < N0; i++) {
		x0[i] = x0max - (i - N0/2 - 1) * dx0;
		y0[i] = -ovalCassiniCanham(x0[i]);
	}
	for(var i = 0; i < N0; i++) {
		var r = new Vect3(x0[i] - sx, y0[i] - sy, 0);
		r0.push(r);
		v0.push(new Vect3(velF, 0, 0));		
	}
	for(var i = 0; i < N0; i++) {
		var neigh = [-2, -1, 1, 2];
		var Nk = neigh.length;
		var l = [];
		for(var k = 0; k < Nk; k++) {
			var j = i + neigh[k];
			if(j < 0) {
				j += Ng;
			} else if(j > Ng - 1) {
				j -= Ng;
			}
			var lij = Vect3.sub(r0[i], r0[j]).len();
			l.push(lij);
		}
		L0.push(l);
	}
	
	// Create 2nd RBC
	var N1 = Ng;
	var x1min = -7.1;
	var x1max = 7.1;
	var dx1 = (x1max - x1min) / (N1/2 - 2);
	var x1 = [];
	var y1 = [];
	x1[0] = x1min;
	y1[0] = 0;
	for(var i = 1; i < N1/2; i++) {
		x1[i] = x1min + (i - 1) * dx1;
		y1[i] = ovalCassiniCanham(x1[i]);
	}
	x1[N1/2] = x1max;
	y1[N1/2] = 0;
	for(var i = N1/2 + 1; i < N1; i++) {
		x1[i] = x1max - (i - N1/2 - 1) * dx1;
		y1[i] = -ovalCassiniCanham(x1[i]);
	}
	for(var i = 0; i < N1; i++) {
		var r = new Vect3(x1[i] + sx, y1[i] + sy, 0);
		r1.push(r);
		v1.push(new Vect3(-velF, 0, 0));
	}
	for(var i = 0; i < N1; i++) {
		var neigh = [-2, -1, 1, 2];
		var Nk = neigh.length;
		var l = [];
		for(var k = 0; k < Nk; k++) {
			var j = i + neigh[k];
			if(j < 0) {
				j += Ng;
			} else if(j > Ng - 1) {
				j -= Ng;
			}
			var lij = Vect3.sub(r0[i], r0[j]).len();
			l.push(lij);
		}
		L1.push(l);
	}
	
	// Calculate initial pressure
	var rc0 = new Vect3;
	for(var i = 0; i < N0; i++) {
		rc0 = Vect3.add(rc0, r0[i]);
	}
	rc0 = Vect3.div(rc0, N0);
	var A0 = 0;
	for(var i = 0; i < N0; i++) {
		var j = i + 1;
		if(j < 0) {
			j += Ng;
		} else if(j > Ng - 1) {
			j -= Ng;
		}
		var p = Vect3.sub(r0[i], rc0);
		var l = Vect3.sub(r0[j], rc0);
		var dA = Vect3.cross(p, l).len();
		A0 += dA;
	}
	pin0 = gP * temF / A0;
	var rc1 = new Vect3;
	for(var i = 0; i < N1; i++) {
		rc1 = Vect3.add(rc1, r1[i]);
	}
	rc1 = Vect3.div(rc1, N1);
	var A1 = 0;
	for(var i = 0; i < N1; i++) {
		var j = i + 1;
		if(j < 0) {
			j += Ng;
		} else if(j > Ng - 1) {
			j -= Ng;
		}
		var p = Vect3.sub(r1[i], rc1);
		var l = Vect3.sub(r1[j], rc1);
		var dA = Vect3.cross(p, l).len();
		A1 += dA;
	}
	pin1 = gP * temF / A1;
	
	pout = 0.5 * (pin0 + pin1);
	
	// Calculate initial length to center
	for(var i = 0; i < N0; i++) {
		var lc = Vect3.sub(r0[i], rc0).len();
		LC0.push(lc);
	}
	for(var i = 0; i < N1; i++) {
		var lc = Vect3.sub(r1[i], rc1).len();
		LC1.push(lc);
	}
}

// Draw system on canvas
function drawGrains() {
	var can = document.getElementById(caOut);
	var cx = can.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, can.width, can.height);
	
	cx.strokeStyle = "#f00";
	cx.beginPath();
	for(var i = 0; i < r0.length; i++) {
		var r = transform(r0[i].x, r0[i].y);
		if(i == 0) {
			cx.moveTo(r.x, r.y);
		} else {
			cx.lineTo(r.x, r.y);
		}
	}
	cx.closePath();
	cx.stroke();
	
	cx.strokeStyle = "#00f";
	cx.beginPath();
	for(var i = 0; i < r1.length; i++) {
		var r = transform(r1[i].x, r1[i].y);
		if(i == 0) {
			cx.moveTo(r.x, r.y);
		} else {
			cx.lineTo(r.x, r.y);
		}
	}
	cx.closePath();
	cx.stroke();
	
	function transform(x, y) {
		var YMIN = can.height;
		var YMAX = 0;
		var XMIN = 0;
		var XMAX = can.width;
		
		var X = (x - xmin) / (xmax - xmin) * (XMAX - XMIN) + XMIN;
		var Y = (y - ymin) / (ymax - ymin) * (YMAX - YMIN) + YMIN;
		
		return {x: X, y: Y};
	}
}

// Create visual elements and set layout
function setElementsLayout() {
	// Create input textarea
	var taIn = document.createElement("textarea");
	taIn.style.width = "150px";
	taIn.style.height = "390px";
	taIn.style.overflowY = "scroll"
	taIn.style.float = "left";
	taIn.id = arguments[0];
	
	// Create output canvas
	var caOut = document.createElement("canvas");
	caOut.width = "400";
	caOut.height = "200";
	caOut.style.width = caOut.width + "px";
	caOut.style.height = caOut.height + "px";
	caOut.style.float = "right";
	caOut.style.border = "#aaa 1px solid";
	caOut.style.paddingRight = "2px";
	var cx = caOut.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, caOut.width, caOut.height);
	caOut.id = arguments[1];
	
	// Create ouput textarea 0
	var taOut0 = document.createElement("textarea");
	taOut0.style.width = "161px";
	taOut0.style.height = -2
		+ parseInt(taIn.style.height)
		- parseInt(caOut.style.height) + "px"
	taOut0.style.overflowY = "scroll";
	taOut0.style.float = "left";
	taOut0.id = arguments[2];
	
	// Create ouput textarea 0
	var taOut1 = document.createElement("textarea");
	taOut1.style.width = "161px";
	taOut1.style.height = -2
		+ parseInt(taIn.style.height)
		- parseInt(caOut.style.height) + "px"
	taOut1.style.overflowY = "scroll";
	taOut1.style.float = "left";
	taOut1.id = arguments[3];
	
	// Create buttons
	var btClear = document.createElement("button");
		btClear.innerHTML = "Clear";
		btClear.style.width = "70px";
		btClear.addEventListener("click", buttonClick);
		btClear.id = arguments[4];
	var btLoad = document.createElement("button");
		btLoad.innerHTML = "Load";
		btLoad.style.width = "70px";
		btLoad.addEventListener("click", buttonClick);
		btLoad.id = arguments[5];
	var btRead = document.createElement("button");
		btRead.innerHTML = "Read";
		btRead.style.width = "70px";
		btRead.disabled = true;
		btRead.addEventListener("click", buttonClick);
		btRead.id = arguments[6];
	var btStart = document.createElement("button");
		btStart.innerHTML = "Start";
		btStart.style.width = "70px";
		btStart.disabled = true;
		btStart.addEventListener("click", buttonClick);
		btStart.id = arguments[7];
	var btInfo = document.createElement("button");
		btInfo.innerHTML = "Info";
		btInfo.style.width = "70px";
		btInfo.addEventListener("click", buttonClick);
		btInfo.id = arguments[8];
	
	// Create main division
	var div0 = document.createElement("div");
	div0.style.border = "#aaa 1px solid";
	div0.style.width = 10
		+ parseInt(taIn.style.width)
		+ parseInt(caOut.style.width) + "px";
	div0.style.height = 6
		+ parseInt(taIn.style.height) + "px";
	div0.style.background = "#eee";
	
	// Set layout of visual components
	document.body.append(div0);
		div0.append(taIn);
		div0.append(caOut);
		div0.append(taOut0);
		div0.append(taOut1);
		div0.append(btClear);
		div0.append(btLoad);
		div0.append(btRead);
		div0.append(btStart);
		div0.append(btInfo);
}

// Do something when buttons clicked
function buttonClick() {
	var target = event.target;
	var id = target.id;
	if(id == "load") {
		loadParameters(taIn);
		document.getElementById(btRead).disabled = false;
	} else if(id == "clear") {
		clearAll();
		document.getElementById(btRead).disabled = true;
		document.getElementById(btStart).disabled = true;
	} else if(id == "read") {
		readParameters();
		createRBCs();
		drawGrains();
		document.getElementById(btStart).disabled = false;
	} else if(id == "start") {
		if(target.innerHTML == "Start") {
			target.innerHTML = "Stop";
			document.getElementById(btRead).disabled = true;
			document.getElementById(taIn).disabled = true;
			proc = setInterval(simulate, Tproc);
		} else {
			target.innerHTML = "Start";
			document.getElementById(btRead).disabled = false;
			document.getElementById(taIn).disabled = false;
			clearInterval(proc);
		}
	}
}

// Clear all
function clearAll() {
	document.getElementById(taIn).value = "";
	document.getElementById(taOut0).value = "";
	var can = document.getElementById(caOut)
	var cx = can.getContext("2d");
	cx.fillStyle = "#fff";
	cx.fillRect(0, 0, can.width, can.height);
}

// Load parameters to textarea
function loadParameters() {
	var lines = "";
	lines += "# Grains\n";
	lines += "DIAG 0.1\n"
	lines += "RHOG 1000\n";
	lines += "NUMG 100\n";
	lines += "\n";
	
	lines += "# Constants\n";
	lines += "KONS0 500\n";
	lines += "KONS1 100\n";
	lines += "KONS2 100\n";
	lines += "GAMP 1\n";
	lines += "KONP 1\n";
	lines += "KONV 1\n";
	lines += "ETAF 1\n";
	lines += "VELF 1\n";
	lines += "TEMF 300\n";
	lines += "KONN 10000\n";
	lines += "\n";
	
	lines += "# Simulation\n";
	lines += "TSTEP 0.001\n";
	lines += "TBEG 0\n";
	lines += "TEND 4\n";
	lines += "TDATA 0.1\n";
	lines += "TPROC 1\n";
	lines += "\n";
	
	lines += "# Coordinates\n";
	lines += "XMIN -20\n";
	lines += "YMIN -10\n";
	lines += "XMAX 20\n";
	lines += "YMAX 10\n";
	
	var ta = document.getElementById(arguments[0]);
	ta.value = lines;
	ta.scrollTop = ta.scrollHeight;
}

// Read parameters
function readParameters() {
	var lines = document.getElementById(taIn).value;
	
	Dg = getValue(lines, "DIAG");
	rhog = getValue(lines, "RHOG");
	mg = rhog * (Math.PI/6) * Dg * Dg * Dg;
	Ng = getValue(lines, "NUMG");
	
	kS0 = getValue(lines, "KONS0");
	kS1 = getValue(lines, "KONS1");
	kS2 = getValue(lines, "KONS2");
	gP = getValue(lines, "GAMP");
	kP = getValue(lines, "KONP"); 
	kV = getValue(lines, "KONV");
	etaF = getValue(lines, "ETAF");
	velF = getValue(lines, "VELF");
	temF = getValue(lines, "TEMF");
	kN = getValue(lines, "KONN");
	
	tbeg = getValue(lines, "TBEG");
	tend = getValue(lines, "TEND");
	dt = getValue(lines, "TSTEP");
	Tdata = getValue(lines, "TDATA");
	Tproc = getValue(lines, "TPROC");
	t = tbeg;
	NData = Math.round(Tdata / dt);
	iData = NData;
	digit = -Math.floor(Math.log10(Tdata));
	
	xmin = getValue(lines, "XMIN");
	ymin = getValue(lines, "YMIN");
	xmax = getValue(lines, "XMAX");
	ymax = getValue(lines, "YMAX");

	r0 = []; v0 = [];
	l0m2 = []; l0m1 = []; l0p1 = []; l0p2 = [];
	r1 = []; v1 = [];
	l1m2 = []; l1m1 = []; l1p1 = []; l1p2 = [];
}

// Get value from a line inside parameter textarea
function getValue(lines, key) {
	var value = undefined;
	var line = lines.split("\n");
	var N = line.length;
	for(var i = 0; i < N; i++) {
		var col = line[i].split(" ");
		if(col[0] == key) {
			value = parseFloat(col[1]);
		}
	}
	return value;
}
*/