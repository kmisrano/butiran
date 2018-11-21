/*
	md_ssastc2d.js
	Simulation of spherical asteroid compaction in 2-data
	
	Sparisoma Viridi | dudung@gmail.compile
	Putri Mustika Widartiningsih | putrimw.itb@gmail.com
	
	20181121
	Change to JS.
	Problem by Potential class / function, which is commented.
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

// Define sum of series
Vect3.sum = function(b) {
	var a=0;
	var c=0;
	for (var a=0; a<=b; a++) {
		c += a;
	}
	return a,c;
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
	
	20170809
	Adding potential energy
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

// Define viscous force
Force.visc = function(p) {
	var v = p.v;
	var f = Vect3.mul(-kV2, v);
	return f;
}

// Commented 20181121.0800
/*

// Class of Potential -- Added 20181121.0800
function Pontential() {
	
}

//Define gravitation potential energy
Potential.grav = function(p1, p2) {
	var m1 = p1.m;
	var m2 = p2.m;
	var r1 = p1.r;
	var r2 = p2.r;
	var r = Vect3.sub(r1, r2);
	var V = -kG * m1 * m2 / Vect3.len(r);
	return V;
}

//Define spring potential energy
Potential.norm = function(p1, p2) {
	var r1 = p1.r;
	var r2 = p2.r;
	var r = Vect3.sub(r1, r2);
	var V = 0.5 * kV * Math.pow(Vect3.len(r),2);
	return V;
}

*/

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
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(xx, yy, 0.5 * DD, 0, 2 * Math.PI);
	ctx.stroke();
	
	ctx.font = "16px Arial"
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
	ta.rows = "2";
	ta.cols = "32";
	ta.style.overflowY = "scroll";
	ta.style.display = "block";	
	ta.id = "hout";
	
	var res = document.createElement("textarea");
	ldiv.appendChild(res);
	res.style.color = "black";
	res.style.background = "white";
	res.rows = "35";
	res.cols = "32";
	res.style.overflowY = "scroll";
	res.style.display = "block";	
	res.id = "result";
	res.value = "";
	
	// Create canvas for drawing
	var c = document.createElement("canvas");
	rdiv.appendChild(c);
	c.id = "canvas";
	c.style.border = "1px solid #999";
	c.style.background = "white";
	c.width = "500";
	c.height = "500";
	//c.style.float = "left";
	var ctx = c.getContext("2d");
	
	// Prepare canvas
	setCanvasCoordinates("canvas");
	setWorldCoordinates(-6, -6, 6, 6);
	
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
var N = 60;
var grains = new Array(N);
var x = new Array(N);
var y = new Array(N);

layout();
initiate();

function initiate() {
	Mdynamics.setdt(1E-4);
	
	var m1 = 1;
	var c1 = "#00f";
	var m2 = 3;
	var c2 = "#f00";
	//var c2 = "#00f";
	
	var D = 1;
	var D2 = 1;
	var x0 = -4;
	var y0 = -4;
	var i = 0;
	var j = 0;
	
	for(var ix = 0; ix < N; ix++) {
		grains[i] = new Grain;
		grains[i].i = i;
		//if(ix-(6*j)-6*(j-1)< 0) {
		if(ix-6*Vect3.sum(j)< 0) {
			Theta = 2*Math.PI/(j*6);
			if ((ix % j) == 0) {
				x[i] = j*D * Math.cos(Theta*i);
				y[i] = j*D * Math.sin(Theta*i);
				grains[i].r = new Vect3(x[i], y[i], 0);
				var cR = 128;
				var cG = (16 - i) * 16;
				var cB = i * 16;
				if((ix != 36)&&(ix != 58)){
					grains[i].m = m1;
					grains[i].c = c1;
					grains[i].D = 0.9*D;
				} else {
					grains[i].m = m2;
					grains[i].c = c2;
					grains[i].D = 0.9*D2;
				}
			} else {
				x[i] = (j*D - (j-1)*D/(2*j)) * Math.cos(Theta*i);
				y[i] = (j*D - (j-1)*D/(2*j)) * Math.sin(Theta*i);
				grains[i].r = new Vect3(x[i], y[i], 0);
				var cR = 128;
				var cG = (16 - i) * 16;
				var cB = i * 16;

				if((ix != 36)&&(ix != 58)){
					grains[i].m = m1;
					grains[i].c = c1;
					grains[i].D = 0.9*D;
				} else {
					grains[i].m = m2;
					grains[i].c = c2;
					grains[i].D = 0.9*D2;
				}
			}
			
		} else {
			j = j+1;
			Theta = 2*Math.PI/(j*6);
			if ((ix % j) == 0) {
				x[i] = j*D * Math.cos(Theta*i);
				y[i] = j*D * Math.sin(Theta*i);
				grains[i].r = new Vect3(x[i], y[i], 0);
				var cR = 128;
				var cG = (16 - i) * 16;
				var cB = i * 16;
				if((ix != 36)&&(ix != 58)){
					grains[i].m = m1;
					grains[i].c = c1;
					grains[i].D = 0.9*D;
				} else {
					grains[i].m = m2;
					grains[i].c = c2;
					grains[i].D = 0.9*D2;
				}
			} else {
				x[i] = (j*D - (j-1)*D/(2*j)) * Math.cos(Theta*i);
				y[i] = (j*D - (j-1)*D/(2*j)) * Math.sin(Theta*i);
				grains[i].r = new Vect3(x[i], y[i], 0);
				var cR = 128;
				var cG = (16 - i) * 16;
				var cB = i * 16;
				if((ix != 36)&&(ix != 58)){
					grains[i].m = m1;
					grains[i].c = c1;
					grains[i].D = 0.9*D;
				} else {
					grains[i].m = m2;
					grains[i].c = c2;
					grains[i].D = 0.9*D2;
				}

			}
		}
		i++;
	}					
	
	for(var iN = 0; iN < N; iN++) {
		plotParticle(grains[iN]);
	}
}

function run() {
	// Prepare variabel for saving sum of forces
	var SF = new Array(N);
	for(var iN = 0; iN < N; iN++) {
		SF[iN] = new Vect3;
	}
	
	// Calculate viscous force
	for(var iN = 0; iN < N; iN++) {
		var f = Force.visc(grains[iN]);
		SF[iN] = Vect3.add(SF[iN], f);
	}
	
	// Calculate gravitation force
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
	
	/*var r1 = Vect3.sub(grains[36].r, grains[58].r);
	var r11 = Vect3.len(r1);
	
	var str = "t = " + t.toFixed(4) + " s\n" + "r = " + r11 + " D";
	var hout = document.getElementById("hout");
	hout.innerHTML = str;
	
	document.getElementById("result").value = document.getElementById("result").value + t.toFixed(4) +"\t" + r11.toFixed(4) + "\n";*/
	
	var str = "t = " + t.toFixed(4) + " s";
	var hout = document.getElementById("hout");
	hout.innerHTML = str;
	
	clearCurrentFigure();
	for(var iN = 0; iN < N; iN++) {
		plotParticle(grains[iN]);
	}
	
	for(var iN = 0; iN < N; iN++) {
		Mdynamics.Euler(SF[iN], grains[iN]);
	}
	Mdynamics.inct();
}
