/*
	md_rbcellips.js
	Moleculare Dynamics of Red Blood Cell Form Change

	Ismi Yasifa | 
	Sparisoma Viridi | dudung@gmail.com
	
	20181126
	Get previous version from Ismi and change it to JS.
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
kV2 = 10.0;

// Class of Force
function Force() {
	
}

// Define spring force
Force.spring = function(p1, p2, k, l) {
	var r1 = p1.r;
	var r2 = p2.r;
	var r = Vect3.sub(r1, r2);
	var rlen = Vect3.len(r);
	var u = Vect3.uni(r);
	var a = Vect3.mul((rlen-l),u);
	var f = Vect3.mul(-k,a);
	return f;
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

// Define viscous force
Force.visc = function(p) {
	var v = p.v;
	var f = Vect3.mul(-kV2, v);
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

// Redefine some constants from force.js
kG = 5E0;
kR = 1E5;
kV = 1.0;
kE = 1.0;
kV2 = 0.8;

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
	ldiv.style.border = "0px black solid";
	ldiv.style.height = "402px";
	ldiv.style.float = "left";
	ldiv.style.width = "252px";
	
	// Create right division
	var rdiv = document.createElement("div");
	document.body.appendChild(rdiv);
	rdiv.style.border = "0px black solid";
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
	setWorldCoordinates(-10, -10, 10, 10);
	
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









var timer1;
var N = 50;
var grains = new Array(N);
var R = 3;
var Ry = 1.2 * R;
var Rx = 0.8 * R;
var delta_teta = 2 * Math.PI / N;
var teta = new Array(N);
var l10 = new Array(N);
var l20 = new Array(N);
var kr = 5;
var kt = 3;
var A1;
var Atot1;
var A2;
var Atot2;
var Po = 10;
var Pi_1 = Po;
var Pi_2;
var delta_P;
var delta_P1;
var theta0 = new Array(N);
var theta1 = new Array(N);
var a0 = 0.05179025;
var a1 = 2.002558;
var a2 = -4.491048;

var it = 0;
var Nt = 100;

layout();
initiate();

function initiate() {
Mdynamics.setdt(1E-2);

var m = 3;
var c = "#f00";
var D = 2;
var x0 = 0;
var y0 = 0;

// Plot initial particle
var x = R;
for(var i = 1; i <= N/2; i++) {
	var h = Math.pow(x,2);
	var w = Math.pow(2*R,2);
	var y = y0 + (2*R*Math.sqrt(1-(4*h/w))*(a0+(a1*(h/w))+(a2*(h*h)/(w*w))));
		grains[i] = new Grain;
		grains[i].i = i;
		grains[i].r = new Vect3(x, y, 0);
		var cR = 128;
		var cG = (16 - i) * 16;
		var cB = i * 16;
		grains[i].m = m;
		grains[i].c = c;
		grains[i].D = 0.25 * D;
		//console.log(grains[i].r);
		x -= (2*R/(N/2));
}

x = -R;
for(var i = (N/2)+1; i <= N; i++) {
	var h = Math.pow(x,2);
	var w = Math.pow(2*R,2);
	var y = y0 - (2*R*Math.sqrt(1-(4*h/w))*(a0+(a1*(h/w))+(a2*(h*h)/(w*w))));
		grains[i] = new Grain;
		grains[i].i = i;
		grains[i].r = new Vect3(x, y, 0);
		var cR = 128;
		var cG = (16 - i) * 16;
		var cB = i * 16;
		grains[i].m = m;
		grains[i].c = c;
		grains[i].D = 0.25 * D;
		//console.log(grains[i].r);
		x += (2*R/(N/2));
}

//Calculate initial length between particle
for(var i = 1; i <= N; i++) {
	l10[i] = new Array(N);
	l20[i] = new Array(N);
	for(var j = 1; j <= N; j++) {
		if (Math.abs(j-i)==1 || Math.abs(j-i)==N-1) { //between one particle
			l10[i][j] = Vect3.len(Vect3.sub(grains[i].r, grains[j].r));
		} else if (Math.abs(j-i)==2 || Math.abs(j-i)==N-2) { //between two particles
			l20[i][j] = Vect3.len(Vect3.sub(grains[i].r, grains[j].r));
		}
	}
}

for(var i = 1; i <= N; i++) {
	teta[i] = (i-1) * delta_teta;
	var x = x0 + (Ry * Math.cos(teta[i]));
	var y = y0 + (Rx * Math.sin(teta[i]));
		grains[i] = new Grain;
		grains[i].i = i;
		grains[i].r = new Vect3(x, y, 0);
		var cR = 128;
		var cG = (16 - i) * 16;
		var cB = i * 16;
		grains[i].m = m;
		grains[i].c = c;
		grains[i].D = 0.25 * D;
		//console.log(grains[i].r);
}
for(var iN = 1; iN <= N; iN++) {
	plotParticle(grains[iN]);
}

//Calculate initial angle between particles
for(var i = 1; i <= N; i++) {
	theta0[i] = new Array(N);
	for(var j = 1; j <= N; j++) {
		if (Math.abs(j-i)==2 || Math.abs(j-i)==N-2) {
			if (Math.abs(j-i)==N-2) {
				if (i==1 || j==1) {
				var a = Vect3.dot(Vect3.sub(grains[N].r,grains[1].r), Vect3.sub(grains[N].r,grains[N-1].r));
				var b = Vect3.len(Vect3.sub(grains[N].r,grains[1].r));
				var c = Vect3.len(Vect3.sub(grains[N].r,grains[N-1].r));
				theta0[i][j] = Math.acos(a/(b*c));
				} else  if (i==2 || j==2) {
				var a = Vect3.dot(Vect3.sub(grains[1].r,grains[2].r), Vect3.sub(grains[1].r,grains[N].r));
				var b = Vect3.len(Vect3.sub(grains[1].r,grains[2].r));
				var c = Vect3.len(Vect3.sub(grains[1].r,grains[N].r));
				theta0[i][j] = Math.acos(a/(b*c));
				}
			} else {
				if (i>j) {
				var a = Vect3.dot(Vect3.sub(grains[i-1].r,grains[i].r), Vect3.sub(grains[i-1].r,grains[j].r));
				var b = Vect3.len(Vect3.sub(grains[i-1].r,grains[i].r));
				var c = Vect3.len(Vect3.sub(grains[i-1].r,grains[j].r));
				theta0[i][j] = Math.acos(a/(b*c));
				} else {
				var a = Vect3.dot(Vect3.sub(grains[i+1].r,grains[i].r), Vect3.sub(grains[i+1].r,grains[j].r));
				var b = Vect3.len(Vect3.sub(grains[i+1].r,grains[i].r));
				var c = Vect3.len(Vect3.sub(grains[i+1].r,grains[j].r));
				theta0[i][j] = Math.acos(a/(b*c));
				}
			}
		}
	}
}

//Calculate area between two particles
var center = new Vect3(0, 0, 0);
Atot1 = 0;
for(var i = 1; i <= N; i++) {
	if (i==N) {
		var a = Vect3.dot(Vect3.sub(grains[i].r,center), Vect3.sub(grains[1].r,center));
		var b = Vect3.len(Vect3.sub(grains[i].r,center));
		var c = Vect3.len(Vect3.sub(grains[1].r,center));
		theta = Math.acos(a/(b*c));
		A1 = (b*c*Math.sin(theta))/2;
		Atot1 += A1;
	} else {
		var a = Vect3.dot(Vect3.sub(grains[i].r,center), Vect3.sub(grains[i+1].r,center));
		var b = Vect3.len(Vect3.sub(grains[i].r,center));
		var c = Vect3.len(Vect3.sub(grains[i+1].r,center));
		theta = Math.acos(a/(b*c));
		A1 = (b*c*Math.sin(theta))/2;
		Atot1 += A1;
	}
}

delta_P = Po-Pi_1;
}

function run() {
// Prepare variabel for saving sum of forces
var SF = new Array(N);
var Ep;
var k;
var l;
var dl = 0;

for(var iN = 1; iN <= N; iN++) {
	SF[iN] = new Vect3;
}
Ep = 0;
// Calculate spring force
for(var iN = 1; iN <= N; iN++) {
	for(var jN = 1; jN <= N; jN++) {
		if (iN!=jN) {
			if (Math.abs(jN-iN)==1 || Math.abs(jN-iN)==N-1) {
				var f = new Vect3;
				k = kr;
				if (iN==1 || iN==(N/2)+1 || jN==1 || jN==(N/2)+1) {
					l = 0.9*l10[iN][jN] + dl;
				} else {
					l = l10[iN][jN] + dl;
				}
				f = Force.spring(grains[iN], grains[jN], k, l);
				SF[iN] = Vect3.add(SF[iN], f);
				var rsub = Vect3.sub(grains[iN].r, grains[jN].r);
				var rlen = Vect3.len(rsub);
				Ep += 1/2*k*(rlen-l)*(rlen-l);
			} else if (Math.abs(jN-iN)==2 || Math.abs(jN-iN)==N-2) {
				var f = new Vect3;
				k = kt;
				if (iN==1 || iN==(N/2)+1 || jN==1 || jN==(N/2)+1) {
					l = 0.9*l20[iN][jN] + dl;
				} else {
					l = l20[iN][jN] + dl;
				}
				f = Force.spring(grains[iN], grains[jN], k, l);
				SF[iN] = Vect3.add(SF[iN], f);
				var rsub = Vect3.sub(grains[iN].r, grains[jN].r);
				var rlen = Vect3.len(rsub);
				Ep += 1/2*k*(rlen-l)*(rlen-l);
			} 
		}
	}
}
console.log(Ep);

// Normal vector
var n = new Array(N);
for(var iN = 1; iN <= N; iN++) {
	n[iN] = new Vect3;
}

for(var iN = 1; iN <= N; iN++) {
	if (iN==1) {
		n[iN].x = grains[N].r.y-grains[iN+1].r.y;
		n[iN].y = -1*(grains[N].r.x-grains[iN+1].r.x);
	} else if (iN==N) {
		n[iN].x = grains[iN-1].r.y-grains[1].r.y;
		n[iN].y = -1*(grains[iN-1].r.x-grains[1].r.x);
	} else {
		n[iN].x = grains[iN-1].r.y-grains[iN+1].r.y;
		n[iN].y = -1*(grains[iN-1].r.x-grains[iN+1].r.x);
	}
} 

// Calculate pressure force
var c = 1;
for(var iN = 1; iN <= N; iN++) {
	var fp = c*delta_P*grains[iN].D;
	var f = new Vect3;
	f = Vect3.mul(fp, n[iN]);
	SF[iN] = Vect3.add(SF[iN], f);
}

/* // Calculate viscous force
for(var iN = 1; iN <= N; iN++) {
if (iN==1 || iN==(N/2)+1) {
	var f = Force.visc(grains[iN]);
} else {
	var f = new Vect3(0,0,0);
}
	SF[iN] = Vect3.add(SF[iN], f);
} */

/* // Calculate gravitation force
for(var iN = 0; iN < N; iN++) {
	for(var jN = 0; jN < N; jN++) {
		var f = new Vect3;
		if(jN != iN) {
			f = Force.grav(grains[iN], grains[jN]);
			SF[iN] = Vect3.add(SF[iN], f);
		}
	}
}

// Calculate normal force
for(var iN = 0; iN < N; iN++) {
	for(var jN = 0; jN < N; jN++) {
		var f = new Vect3;
		if(jN != iN) {
			f = Force.norm(grains[iN], grains[jN]);
			SF[iN] = Vect3.add(SF[iN], f);
		}
	}
}
*/

clearCurrentFigure();
for(var i = 1; i <= N; i++) {
	plotParticle(grains[i]);
}

for(var i = 1; i <= N; i++) {
	Mdynamics.Euler(SF[i], grains[i]);
}				
Mdynamics.inct();

//Calculate angle between particles
for(var i = 1; i <= N; i++) {
	theta1[i] = new Array(N);
	for(var j = 1; j <= N; j++) {
		if (Math.abs(j-i)==2 || Math.abs(j-i)==N-2) {
			if (Math.abs(j-i)==N-2) {
				if (i==1 || j==1) {
				var a = Vect3.dot(Vect3.sub(grains[N].r,grains[1].r), Vect3.sub(grains[N].r,grains[N-1].r));
				var b = Vect3.len(Vect3.sub(grains[N].r,grains[1].r));
				var c = Vect3.len(Vect3.sub(grains[N].r,grains[N-1].r));
				theta1[i][j] = Math.acos(a/(b*c));
				} else  if (i==2 || j==2) {
				var a = Vect3.dot(Vect3.sub(grains[1].r,grains[2].r), Vect3.sub(grains[1].r,grains[N].r));
				var b = Vect3.len(Vect3.sub(grains[1].r,grains[2].r));
				var c = Vect3.len(Vect3.sub(grains[1].r,grains[N].r));
				theta1[i][j] = Math.acos(a/(b*c));
				}
			} else {
				if (i>j) {
				var a = Vect3.dot(Vect3.sub(grains[i-1].r,grains[i].r), Vect3.sub(grains[i-1].r,grains[j].r));
				var b = Vect3.len(Vect3.sub(grains[i-1].r,grains[i].r));
				var c = Vect3.len(Vect3.sub(grains[i-1].r,grains[j].r));
				theta1[i][j] = Math.acos(a/(b*c));
				} else {
				var a = Vect3.dot(Vect3.sub(grains[i+1].r,grains[i].r), Vect3.sub(grains[i+1].r,grains[j].r));
				var b = Vect3.len(Vect3.sub(grains[i+1].r,grains[i].r));
				var c = Vect3.len(Vect3.sub(grains[i+1].r,grains[j].r));
				theta1[i][j] = Math.acos(a/(b*c));
				}
			}
		}
	}
}

//Calculate area between two particles
var center = new Vect3(0, 0, 0);
Atot2 = 0;
for(var i = 1; i <= N; i++) {
	if (i==N) {
		var a = Vect3.dot(Vect3.sub(grains[i].r,center), Vect3.sub(grains[1].r,center));
		var b = Vect3.len(Vect3.sub(grains[i].r,center));
		var c = Vect3.len(Vect3.sub(grains[1].r,center));
		theta = Math.acos(a/(b*c));
		A2 = (b*c*Math.sin(theta))/2;
		Atot2 += A2;
	} else {
		var a = Vect3.dot(Vect3.sub(grains[i].r,center), Vect3.sub(grains[i+1].r,center));
		var b = Vect3.len(Vect3.sub(grains[i].r,center));
		var c = Vect3.len(Vect3.sub(grains[i+1].r,center));
		theta = Math.acos(a/(b*c));
		A2 = (b*c*Math.sin(theta))/2;
		Atot2 += A2;
	}
}
//console.log(Atot2);

Pi_2 = (Pi_1*Atot1)/Atot2;
delta_P = Po-Pi_2;

var rpm = new Vect3;
for(var iN = 1; iN <= N; iN++) {
	var r = grains[iN].r;
	rpm = Vect3.add(rpm, r);
}
rpm = Vect3.div(rpm, N);

R = 0;
for(var iN = 1; iN <= N; iN++) {
	var r = grains[iN].r;
	R += Vect3.len(Vect3.sub(r, rpm));
}
R /= N;
var str = "t = " + t + " s" + R;
var hout = document.getElementById("hout");
hout.innerHTML = str;
}
