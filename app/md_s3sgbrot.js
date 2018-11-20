/*
	md_s3sgbrot.js
	Simulation of three spherical growing body rotation
	
	Sparisoma Viridi | dudung@gmail.compile
	Sinta Nurhia Dewi | sintanurhiadewi@gmail.com
	
	20180527
	Final version.
	20181120
	Merge into butiran project.
	Update with final parameters.
*/



/*
	vect3.js
	Library of Vect3 class in JavaScript
	Sparisoma Viridi | dudung@gmail.com
	
	20170214
	Create this library with following functions defined for
	Vect3 class
	add()	add two Vect3,
	sub() subtract two Vect3,
	dot()	dot product of two Vect3,
	crs()	cross product of two Vect3,
	mul()	multiplication of Vect3 with scalar,
	div() division of Vect3 with scalar,
	len() length of a Vect3,
	uni()	unit vector of a Vect3,
	neg()	negative of a Vect3.
	All are tested and works.
*/

// Class of Vect3
function Vect3() {
	// Define some constructor types
	if(arguments.length == 3) {
		this.x = arguments[0];
		this.y = arguments[1];
		this.z = arguments[2];
	} else if(arguments.length == 1){
		this.x = arguments[0].x;
		this.y = arguments[0].y;
		this.z = arguments[0].z;
	} else {
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}
	this.strval = function() {
		var str = "(";
		str += this.x + ", ";
		str += this.y + ", ";
		str += this.z + ")";
		return str;
	}
}

// Define addition of Vect3
Vect3.add = function(r1, r2) {
	var r = new Vect3;
	r.x = r1.x + r2.x;
	r.y = r1.y + r2.y;
	r.z = r1.z + r2.z;
	return r;
}

// Define substraction of Vect3
Vect3.sub = function(r1, r2) {
	var r = new Vect3;
	r.x = r1.x - r2.x;
	r.y = r1.y - r2.y;
	r.z = r1.z - r2.z;
	return r;
}

// Define dot product of Vect3
Vect3.dot = function(r1, r2) {
	var l = r1.x * r2.x;
	l += r1.y * r2.y;
	l += r1.z * r2.z;
	return l;
}

// Define cross product of Vect3
Vect3.crs = function(r1, r2) {
	var r = new Vect3;
	r.x = r1.y * r2.z - r1.z * r2.y;
	r.y = r1.z * r2.x - r1.x * r2.z;
	r.z = r1.x * r2.y - r1.y * r2.x;
	return r;
}

// Define multiplication with scalar
Vect3.mul = function(a, b) {
	var r = new Vect3;
	if(a instanceof Vect3) {
		r.x = a.x * b;
		r.y = a.y * b;
		r.z = a.z * b;
	} else if(b instanceof Vect3) {
		r.x = a * b.x;
		r.y = a * b.y;
		r.z = a * b.z;
	}
	return r;
}

// Define division with scalar
Vect3.div = function(a, b) {
	var r = new Vect3;
	r.x = a.x / b;
	r.y = a.y / b;
	r.z = a.z / b;
	return r;
}

// Define length of Vect3
Vect3.len = function(r) {
	var l2 = Vect3.dot(r, r);
	var l = Math.sqrt(l2);
	return l;
}

// Define unit vector
Vect3.uni = function(a) {
	var l = Vect3.len(a);
	var r = Vect3.div(a, l);
	return r;
}

// Define negative of a vector
Vect3.neg = function(a) {
	var r = Vect3;
	r.x = -a.x;
	r.y = -a.y;
	r.z = -a.z;
	return r;
}



/*
	grain.js
	Library of grain as granular particle
	Sparisoma Viridi | dudung@gmail.com
	
	20170214
	Create this library consists of only Grain class.
	20170216
	Add field for particle ID with type of integer.
*/

// Class of Grain
function Grain() {
	if(arguments.length == 6) {
		this.i = arguments[0];
		this.m = arguments[1];
		this.D = arguments[2];
		this.q = arguments[3];
		this.c = arguments[4];
		this.r = arguments[5];
		this.v = arguments[6];
	} else if(arguments.length == 1) {
		this.i = arguments[0].i;
		this.m = arguments[0].m;
		this.D = arguments[0].D;
		this.q = arguments[0].q;
		this.c = arguments[0].c;
		this.r = arguments[0].r;
		this.v = arguments[0].v;
	} else {
		this.i = 0;
		this.m = 1.0;
		this.D = 1.0;
		this.q = 1.0;
		this.c = "#000";
		this.r = new Vect3;
		this.v = new Vect3;
	}
	this.strval = function() {
		var str = "(" 
		str += this.i + ", ";
		str += this.m + ", ";
		str += this.D + ", ";
		str += this.q + ", ";
		str += this.c + ", ";
		str += this.r.strval() + ", ";
		str += this.v.strval() + ")";
		return str;
	}
}



/*
	force.js
	Library of some types of physical force.
	Sparisoma Viridi | dudung@gmail.com
	
	20170214
	Create this library and define some constants,
	e.g. kG, kR, kV, kE and some functions
	grav()	gravitation force,
	norm()	normal force,
	coul()	Coulomb force.
	These two are tested for value only and not yet in
	simulation.
	20170215
	Test the grav() and norm() in a simulation. They worked.
*/

// Define some constants
kG = 5E0;
kR = 1E5;
kV = 1.0;
kE = 1.0;
kV2 = 40.0;

// Class of Force
function Force() {
	
}

// Define gravitation force
Force.grav = function(p1, p2) {
	var m1 = p1.m;
	var m2 = p2.m;
	var r1 = p1.r;
	var r2 = p2.r;
	var r = Vect3.sub(r1, r2);
	var u = Vect3.uni(r);
	var f = Vect3.mul(-kG * m1 * m2 / Vect3.dot(r, r), u);
	return f;
}

// Define normal force
Force.norm = function(p1, p2) {
	var R1 = 0.5 * p1.D;
	var R2 = 0.5 * p2.D;
	var r1 = p1.r;
	var r2 = p2.r;
	var r = Vect3.sub(r1, r2);
	var u = Vect3.uni(r);
	var v1 = p1.v;
	var v2 = p2.v;
	var v = Vect3.sub(v1, v2);
	var xi = Math.max(0, R1 + R2 - Vect3.len(r));
	var xidot = Vect3.len(v);
	var f = Vect3.mul(kR * xi - kV * xidot, u);
	if(xi == 0) {
		f = new Vect3;
	}
	return f;
}

// Define Coulomb force
Force.coul = function(p1, p2) {
	var q1 = p1.q;
	var q2 = p2.q;
	var r1 = p1.r;
	var r2 = p2.r;
	var r = Vect3.sub(r1, r2);
	var u = Vect3.uni(r);
	var f = Vect3.mul(kE * q1 * q2 / Vect3.dot(r, r), u);
	return f;
}

// Define viscous forc
Force.viscous = function(p, b) {
	var v = p.v;
	var f = Vect3.mul(-b, v);
	return f;
}

Force.grave = function(p, g) {
	var m = p.m;
	var f = Vect3.mul(m, g);
	return f;
}

Force.buoy = function(p, rhof, g) {
	var D = p.D;
	var V = Math.PI * D * D * D / 6;
	var f = Vect3.mul(-rhof, Vect3.mul(g, V));
	//console.log(f);
	return f;
}

Force.spring = function(p1, p2, k) {
	var r1 = p1.r;
	var r2 = p2.r;
	var r = Vect3.sub(r1, r2);
	var u = Vect3.uni(r);
	
	var r12 = Vect3.len(r);
	
	var D1 = p1.D;
	var D2 = p2.D;
	var l12 = 0.5 * (D1 + D2);

	var f = Vect3.mul(-k * (r12 - l12), u);
	return f;
}



/*
	mdynamics.js
	Library of simple molecular dynamics
	Sparisoma Viridi | dudung@gmail.com
	
	20170214
	Create this library.
	20170215
	There is bug in using Timer object, where it was twice
	called, then it could not be stopped. A condition must
	be set to avoid creating another object incidentally.
*/

// Define some global constants
dt = 0.01;
t = 0;

// Class of Mdynamics
function Mdynamics() {
	
}

// Set time step and reset time
Mdynamics.setdt = function(dtt) {
	dt = dtt;
	t = 0;
}

// Perform Euler integration
Mdynamics.Euler = function(SF, p) {
	var m = p.m;
	var r = p.r;
	var v = p.v;
	var a = Vect3.div(SF, m);
	r = Vect3.add(r, Vect3.mul(v, dt));
	v = Vect3.add(v, Vect3.mul(a, dt));
	p.r = r;
	p.v = v;
}

// Increase time
Mdynamics.inct = function() {
	t += dt;
}



/*
	draw2d.js
	Set drawing environment in 2d using canvas object
	Sparisoma Viridi | dudung@gmail.com
	
	20170117
	Create drawing environment for draw demonstration in
	a lecture, with functions
	setWorldCoordinates()
	setCanvasCoordinates()
	transX()
	transY()
	clearCurrentFigure()
	20170215
	Integrate and adjust previous work to Grains.
	20160216
	Add text for particle identification with center for
	horizontal alignment and middle for vertical alignment.
*/	

// Define global variables for real world coordinates
var xwmin = 0;
var ywmin = 0;
var xwmax = 0;
var ywmax = 0;

// Define global variables for canvas coordinate
var xcmin = 0;
var ycmin = 0;
var xcmax = 0;
var ycmax = 0;

// Define current canvas
var currentFigure = "";
var figureBackground = "#fff";

// Set real world coordinates
function setWorldCoordinates(xmin, ymin, xmax, ymax) {
	xwmin = xmin;
	ywmin = ymin;
	xwmax = xmax;
	ywmax = ymax;	
}

// Set canvas coordinates
function setCanvasCoordinates(canvasId) {
	currentFigure = canvasId;
	var c = document.getElementById(canvasId);	
	xcmin = 0;
	ycmin = c.height;
	xcmax = c.width;
	ycmax = 0;
}

// Transform x
function transX(x) {
	var xx = (x - xwmin) / (xwmax - xwmin) * (xcmax - xcmin);
	xx += xcmin;
	var X = parseInt(xx);
	return X;
}

// Transform y
function transY(y) {
	var yy = (y - ywmin) / (ywmax - ywmin) * (ycmax - ycmin);
	yy += ycmin;
	var Y = parseInt(yy);
	return Y;
}

// Clear current figure
function clearCurrentFigure() {
	var c = document.getElementById(currentFigure);
	var ctx = c.getContext("2d");
	ctx.fillStyle = figureBackground;
	ctx.fillRect(xcmin, ycmax, xcmax, ycmin);
}

// Plot particle
function plotParticle(p) {
	var x = p.r.x;
	var y = p.r.y;
	var D = p.D;
	
	var xx = transX(x);
	var yy = transY(y);
	var DD = transX(D) - transX(0);
	
	var c = document.getElementById(currentFigure);
	var ctx = c.getContext("2d");
	ctx.strokeStyle = p.c;
	ctx.lineWidth = 1.5;
	ctx.beginPath();
	ctx.arc(xx, yy, 0.5 * DD, 0, 2 * Math.PI);
	ctx.stroke();
	
	ctx.font = "10px Times New Roman"
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.textBaseline="middle";
	ctx.fillText(p.i, xx, yy);
}

// Draw a line
function drawLine(x1, y1, x2, y2, color) {
	var xx1 = transX(x1);
	var yy1 = transY(y1);
	var xx2 = transX(x2);
	var yy2 = transY(y2);
	var c = document.getElementById(currentFigure);
	var ctx = c.getContext("2d");
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(xx1, yy1);
	ctx.lineTo(xx2, yy2);
	ctx.stroke();	
}



/*
	layout.js
	Define layout for simulation.
	Sparisoma Viridi | dudung@gmail.com
	
	20170215
	Start this library.
*/

function layout() {
	// Create left division
	var ldiv = document.createElement("div");
	document.body.appendChild(ldiv);
	ldiv.style.border = "1px black solid";
	ldiv.style.height = "402px";
	ldiv.style.float = "left";
	ldiv.style.width = "252px";
	
	// Create right division
	var rdiv = document.createElement("div");
	document.body.appendChild(rdiv);
	rdiv.style.border = "1px black solid";
	rdiv.style.height = "402px";
	rdiv.style.float = "left";
	
	// Create text area for input
	var ta = document.createElement("textarea");
	ldiv.appendChild(ta);
	ta.style.color = "black";
	ta.style.background = "white";
	ta.rows = "20";
	ta.cols = "32";
	ta.style.overflowY = "scroll";
	ta.style.display = "block";	
	ta.id = "hout";
	
	// Create canvas for drawing
	var c = document.createElement("canvas");
	rdiv.appendChild(c);
	c.id = "canvas";
	c.style.border = "1px solid #999";
	c.style.background = "white";
	c.width = "400";
	c.height = "400";
	//c.style.float = "left";
	var ctx = c.getContext("2d");
	
	// Prepare canvas
	setCanvasCoordinates("canvas");
	setWorldCoordinates(-20, -20, 20, 20);
	
	// Create start button
	var b1 = document.createElement("button");
	ldiv.appendChild(b1);
	b1.innerHTML = "Start";
	b1.onclick = function() {
		if(b1.innerHTML == "Start") {
			b1.innerHTML = "Stop";
			timer1 = setInterval(run, 1);
		} else {
			b1.innerHTML = "Start";
			clearInterval(timer1);
		}
	}
	
	// Create save Button
	var b2 = document.createElement("button");
	ldiv.appendChild(b2);
	b2.innerHTML = "Save";
	b2.onclick = function() {
		var canvas = document.getElementById("canvas");
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		window.location.href = image;
	}
}

// Main program -- 20181120 as predicted

// Create textarea as output
var width = document.documentElement.clientWidth - 20;
width = 750;
var height = document.documentElement.clientHeight - 26;
height = 100;
var outheader = document.createElement("textarea");
outheader.id = "outheader";
outheader.style.width = width + "px";
outheader.style.height = 18 + "px";
outheader.value = "";
var output = document.createElement("textarea");
output.id = "output";
output.style.overflowY = "scroll";
output.style.width = width + "px";
output.style.height = height + "px";
output.value = "";
var outheader2 = document.createElement("textarea");
outheader2.id = "outheader2";
outheader2.style.width = width + "px";
outheader2.style.height = 18 + "px";
outheader2.value = "";
var output2 = document.createElement("textarea");
output2.id = "output2";
output2.style.overflowY = "scroll";
output2.style.width = width + "px";
output2.style.height = height + "px";
output2.value = "";
var outdiv = document.createElement("div");
outdiv.style.float = "left";
outdiv.style.width = width + 10 + "px";
outdiv.style.border = "1px black solid";

// Create canvas for drawing
var c = document.createElement("canvas");
c.id = "canvas";
c.style.border = "1px solid #999";
c.style.background = "white";
c.width = "300";
c.height = "300";
c.style.float = "right";
var ctx = c.getContext("2d");

// Create start button
var b1 = document.createElement("button");
b1.innerHTML = "Start";
b1.onclick = function() {
	if(b1.innerHTML == "Start") {
		b1.innerHTML = "Stop";
		timer1 = setInterval(run, 1);
	} else {
		b1.innerHTML = "Start";
		clearInterval(timer1);
	}
}

// Create save Button
var b2 = document.createElement("button");
b2.innerHTML = "Save";
b2.onclick = function() {
	var canvas = document.getElementById("canvas");
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	window.location.href = image;
}


// Set layout of all components
document.body.append(outdiv);
	outdiv.append(outheader);
	outdiv.append(output);
	outdiv.append(outheader2);
	outdiv.append(output2);
	outdiv.append(b1);
	outdiv.append(b2);
document.body.appendChild(c);

// Prepare canvas
setCanvasCoordinates("canvas");
setWorldCoordinates(-30, -30, 30, 30);
	
// Define initial densities
var fluidDensity = 1.000;
var xDensity = 1.000; 
var headDensity = 1.500;
var stomachDensity = 1.000;

// Define model for head mass
// 0 linear
// 1 exponential
var headMassModel = 1;
// For linear model
var headMassChange = 4; // g / day
// For exponential model
var headMassExp =  0.03;

// Define rate model for stomach mass
// 0 linear
// 1 exponential
var stomachMassModel = 0;
// For liner model
var stomachMassChange = 5; // g/day
// For exponential model
var stomachMassExp = 0.0114;

var timer1;
var N = 3;
var grains = new Array(N);

var kspring = 1E5;
var bfluid = 1E4;
var g = new Vect3(0, -10, 0);

// Define time step
var dt = 0.01;

// Define simulation time
var tend = 84; // weeks

// Define data shown period
var T = 1;
var NT = parseInt(T / dt);
var iT = NT;
console.log(NT);
var showData = false;

initiate();

// Define function for total mass
function totalMass(t) {
	var tt = t / 7.0 + 24; // week
	var m = 46.045 * Math.exp(0.1287 * tt); // gram
	return m;
}

// Define function for head size
function headRadius(t) {
	var R = 0.0173 * t + 3.2483; 
	return R;
}

// Define function for stomach size
function stomachRadius(t) {
	var R = 0.0412 * t + 5.6296; 
	return R;
}

// Define function for third object
function xRadius(t) {
	// Force total density to 1
	var rho = 1.000;
	
	var R1 = headRadius(t);
	var R2 = stomachRadius(t);
	
	var m = totalMass(t);
	
	var V1 = (4 * Math.PI / 3) * R1 * R1 * R1;
	var V2 = (4 * Math.PI / 3) * R2 * R2 * R2;
	
	var Vx = (m /rho )- V1 - V2;
	var Rx = Math.pow(Vx / (4 * Math.PI / 3), (1/3));
	
	return Rx;
}

// Define function of head mass
function headMass(t) {
	// Get initial values
	var R = headRadius(0);
	var V = (4 * Math.PI / 3) * R * R * R;
	var m0 = headDensity * V;
	
	// Choose model:
	// 0 linear
	// 1 exponential
	var model = headMassModel;
	
	// Calculate mass according to chosen model
	var m = 0;
	if(model == 0) {
		// Define head mass change for linier model
		var dmdt = headMassChange;
		
		// Calculate mass
		var tt = t; // week
		m = dmdt * tt + m0; // g
	} else if(model == 1) {
		// Define initial condition A as t = 0 and B
		// for exponential model
		var A = m0;
		var B = headMassExp;
		
		// Calculate mass
		var tt = t; // week
		m = A * Math.exp(B * t); // g		
	} else {
		// Define unknown model
		var m1 = 209.65 * Math.exp (0.0132 * t); 
		m = m1;
	}
	
	return m;
}

// Define function of stomach mass
function stomachMass(t) {
	// Get initial values
	var R = stomachRadius(0);
	var V = (4 * Math.PI / 3) * R * R * R;
	var m0 = stomachDensity * V;
	
	// Choose model:
	// 0 linear
	// 1 exponential
	var model = stomachMassModel;
	
	// Calculate mass according to chosen model
	var m = 0;
	if(model == 0) {
		// Define stomach mass change for linier model
		var dmdt = stomachMassChange;
		
		// Calculate mass
		var tt = t; // week
		m = dmdt * tt + m0; // g
	} else if(model == 1) {
		// Define initial condition A as t = 0 and B
		// for exponential model
		var A = m0;
		var B = stomachMassExp;
		
		// Calculate mass
		var tt = t; // week
		m = A * Math.exp(B * t); // g		
	} else {
		// Define unknown model
		var m2 = 777.34 * Math.exp (0.0164 * t); 
		m = m2;
	}
	
	return m;
}

// Define function for x mass
function xMass(t) {
	var m = totalMass(t);
	
	//var m3 =  11.055 * Math.exp (0.0569 * t); 
	//m = m3;
	
	return m3;	
}

function initiate() {
	// Set molecular dynamics parameter
	Mdynamics.setdt(dt); // set also t = 0
	
	// Set color
	var c1 = "#f00";
	var c2 = "#000";
	var c3 = "#00f";
	
	// Initialize radius
	var R1 = headRadius(t);
	var R2 = stomachRadius(t);
	var R3 = xRadius(t);
	console.log(R1, R2, R3);
	
	var V1 = (4 * Math.PI / 3) * R1 * R1 * R1;
	var V2 = (4 * Math.PI / 3) * R2 * R2 * R2;
	var V3 = (4 * Math.PI / 3) * R3 * R3 * R3;

	var rho1 = headDensity;
	var rho2 = stomachDensity;
	var rho3 = xDensity;
		
	var m1 = rho1 * V1;
	var m2 = rho2 * V2;
	var m3 = rho3 * V3;
	console.log(m1, m2, m3);
	
	var x0 = 0;
	var y0 = 0;
	var i = 0;
	grains[0] = new Grain;
	grains[1] = new Grain;
	grains[2] = new Grain;
	grains[0].r = new Vect3(-0.55, 6, 0);
	grains[1].r = new Vect3(0, -3, 0);
	grains[2].r = new Vect3(-5.5, 3.15, 0);
	grains[0].c = c1;
	grains[1].c = c2;
	grains[2].c = c3;
	grains[0].m = m1;
	grains[1].m = m2;
	grains[2].m = m3;
	grains[0].D = 2 * R1;
	grains[1].D = 2 * R2;
	grains[2].D = 2 * R3;
	grains[0].i = 1;
	grains[1].i = 2;
	grains[2].i = 3;
	
	for(var iN = 0; iN < N; iN++) {
		plotParticle(grains[iN]);
	}
	
	outheader.value = "t\tR1\tR2\tRx\tm\trho\t"
		+ "m1\trho1\t"
		+ "m2\trho2\t"
		+ "mx\trhox\t"
		+ "";
	outheader2.value = "t\tx1\ty1\t"
		+ "x2\ty2\t"
		+ "x3\ty3\t"
		+ "ex\tey\ttheta\t"
		+ "";
}

function run() {
	// Prepare variabel for saving sum of forces
	var SF = new Array(N);
	for(var iN = 0; iN < N; iN++) {
		SF[iN] = new Vect3;
	}
	
	// Calculate viscous force
	for(var iN = 0; iN < N; iN++) {
		var f = Force.viscous(grains[iN], bfluid);
		SF[iN] = Vect3.add(SF[iN], f);
	}
	
	// Calculate gravitational force
	for(var iN = 0; iN < N; iN++) {
		var f = Force.grave(grains[iN], g);
		SF[iN] = Vect3.add(SF[iN], f);
	}
	
	// Calculate bouyant force
	var rhof = fluidDensity;
	for(var iN = 0; iN < N; iN++) {
		var f = Force.buoy(grains[iN], rhof, g);
		SF[iN] = Vect3.add(SF[iN], f);
	}
	
	// Calculate spring force
	for(var iN = 0; iN < N; iN++) {
		for(var jN = 0; jN < N; jN++) {
			var f = new Vect3;
			if(jN != iN) {
				f = Force.spring(grains[iN], grains[jN], kspring);
				SF[iN] = Vect3.add(SF[iN], f);
			}
		}
	}
	
	if(iT >= NT) {
		showData = true;
		iT = 0;
	} else {
		showData = false;
	}
	iT++
	
	// Make visualization for every period T
	if(showData) {
		clearCurrentFigure();
		for(var iN = 0; iN < N; iN++) {
			plotParticle(grains[iN]);
		}
		
		drawLine(
			grains[0].r.x, grains[0].r.y,
			grains[1].r.x, grains[1].r.y,
			"#0f0"
		);
	}
	
	// Change grains properties
	var R1 = headRadius(t);
	var R2 = stomachRadius(t);
	var Rx = xRadius(t);

	grains[0].D = 2 * R1;
	grains[1].D = 2 * R2;
	grains[2].D = 2 * Rx;
	
	var m1 = headMass(t);
	var m2 = stomachMass(t);
	var m = totalMass(t);
	var mx = m - m1 - m2;
	
	grains[0].m = m1;
	grains[1].m = m2;
	grains[2].m = mx;
	
	// Show data for every period T
	if(showData) {
		// Calculate density
		var V1 = (4 * Math.PI / 3) * R1 * R1 * R1;
		var V2 = (4 * Math.PI / 3) * R2 * R2 * R2;
		var Vx = (4 * Math.PI / 3) * Rx * Rx * Rx;
		
		var rho1 = m1 / V1;
		var rho2 = m2 / V2;
		var rhox = mx / Vx;
		
		var V = V1 + V2 + Vx;
		var rho = m / V;
		
		// Calculate orientation
		var r2 = grains[1].r;
		var r1 = grains[0].r;
		var r12 = Vect3.sub(r1, r2);
		var u12 = Vect3.uni(r12);
		var theta = Math.acos(u12.x) / Math.PI * 180;
		if(u12.y < 0) {
			theta = 180 + (180 - theta);
		}
		
		output.value += 
			t.toFixed(3) + "\t"
			+ R1.toFixed(3) + "\t"
			+ R2.toFixed(3) + "\t"
			+ Rx.toFixed(3) + "\t"
			+ m.toExponential(2) + "\t"
			+ rho.toFixed(3) + "\t"
			+ m1.toExponential(2) + "\t"
			+ rho1.toFixed(3) + "\t"
			+ m2.toExponential(2) + "\t"
			+ rho2.toFixed(3) + "\t"
			+ mx.toExponential(2) + "\t"
			+ rhox.toFixed(3) + "\t"
			+ "\n";
		
		output2.value += 
			t.toFixed(3) + "\t"
			+ grains[0].r.x.toFixed(3) + "\t"
			+ grains[0].r.y.toFixed(3) + "\t"
			+ grains[1].r.x.toFixed(3) + "\t"
			+ grains[1].r.y.toFixed(3) + "\t"
			+ grains[2].r.x.toFixed(3) + "\t"
			+ grains[2].r.y.toFixed(3) + "\t"
			+ u12.x.toFixed(3) + "\t"
			+ u12.y.toFixed(3) + "\t"
			+ theta.toFixed(3) + "\t"
			+ "\n";
		
		// Scroll automatically
		output.scrollTop = output.scrollHeight;
		output2.scrollTop = output2.scrollHeight;
	}
	
	// Stop if tend is achieved
	if(t >= tend) {
		clearInterval(timer1);
		b1.innerHTML = "Finish";
		b1.disabled = "true";
	}
	
	// Perform molecular dynamics
	for(var iN = 0; iN < N; iN++) {
		Mdynamics.Euler(SF[iN], grains[iN]);
	}
	Mdynamics.inct();
}

// below are not used

/*
var str = "# t rho x y \n";
str += t + " " + rho + " "
+ grains[0].r.x + " " + grains[0].r.y;
var hout = document.getElementById("hout");
hout.style.width = "500px";
hout.innerHTML = str;
hout.style.display = "none";

function calculateRho(grains) {
	var N = grains.length;
	var Vtot = 0;
	var mtot = 0;
	for(var i = 0; i < N; i++) {
		var R = 0.5 * grains[i].D;
		var m = grains[i].m;
		var V = (4/3) * Math.PI * R * R * R;
		
		mtot += m;
		Vtot += V;
	}
	var rho = mtot / Vtot;
	return rho;
}

// Test function
function testFunction() {
	var duration = 36 - 24; // weeks
	var tbeg = 0; // day
	var tend = duration * 7; // day	
	
	output.value = "t\tR1\tR2\tRx\tm\trho\t"
		+ "m1\trho1\t"
		+ "m2\trho2\t"
		+ "mx\trhox\t"
		+ "\n";
	
	// Iterate
	for(var t = 0; t <= tend; t++) {
		
		// Convert to cm
		var R1 = headRadius(t);
		var R2 = stomachRadius(t);
		//stomachCircumference(t) / ( 2 * Math.PI) * 0.1;
		var Rx = xRadius(t);
		
		var m = totalMass(t);
		
		var V1 = (4 * Math.PI / 3) * R1 * R1 * R1;
		var V2 = (4 * Math.PI / 3) * R2 * R2 * R2;
		var Vx = (4 * Math.PI / 3) * Rx * Rx * Rx;
		var V = V1 + V2 + Vx;
		var rho = m / V;
		
		var m1 = headMass(t);
		var rho1 = m1 / V1;
		
		var m2 = stomachMass(t);
		var rho2 = m2 / V2;
		
		var mx = m - m1 - m2;
		var rhox = mx / Vx;

		output.value += 
			t + "\t"
			+ R1.toFixed(2) + "\t"
			+ R2.toFixed(2) + "\t"
			+ Rx.toFixed(2) + "\t"
			+ m.toExponential(2) + "\t"
			+ rho.toFixed(3) + "\t"
			+ m1.toExponential(2) + "\t"
			+ rho1.toFixed(3) + "\t"
			+ m2.toExponential(2) + "\t"
			+ rho2.toFixed(3) + "\t"
			+ mx.toExponential(2) + "\t"
			+ rhox.toFixed(3) + "\t"
			+ "\n";
	}
}

// Execute
//testFunction();

//t = 0;
//dt = 1;

function layout() {
	// Create left division
	var ldiv = document.createElement("div");
	document.body.appendChild(ldiv);
	ldiv.style.border = "1px black solid";
	ldiv.style.height = "402px";
	ldiv.style.float = "left";
	ldiv.style.width = "252px";
	
	// Create right division
	var rdiv = document.createElement("div");
	document.body.appendChild(rdiv);
	rdiv.style.border = "1px black solid";
	rdiv.style.height = "402px";
	rdiv.style.float = "left";
	
	// Create text area for input
	var ta = document.createElement("textarea");
	ldiv.appendChild(ta);
	ta.style.color = "black";
	ta.style.background = "white";
	ta.rows = "20";
	ta.cols = "32";
	ta.style.overflowY = "scroll";
	ta.style.display = "block";	
	ta.id = "hout";
	
	// Create start button
	var b1 = document.createElement("button");
	ldiv.appendChild(b1);
	b1.innerHTML = "Start";
	b1.onclick = function() {
		if(b1.innerHTML == "Start") {
			b1.innerHTML = "Stop";
			timer1 = setInterval(run, 1);
		} else {
			b1.innerHTML = "Start";
			clearInterval(timer1);
		}
	}
	
	// Create save Button
	var b2 = document.createElement("button");
	ldiv.appendChild(b2);
	b2.innerHTML = "Save";
	b2.onclick = function() {
		var canvas = document.getElementById("canvas");
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		window.location.href = image;
	}
}

*/
