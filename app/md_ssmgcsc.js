/*
	md_ssmgcsc.js
	Simulation of spherical connected magnetic grains
	connected as stretched chain
	
	Aufa Nu'man Fadhilah Rudiawan | aufanu39man@gmail.com
	Sparisoma Viridi | dudung@gmail.com
	
	20181121
	Change to JS.
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
	Aufa Nu'man Fadhilah Rudiawan | aufa.numan@students.itb.ac.id
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
	20180528
	Create kAA, kAB, kBB constants and spri() function.
*/

// Define some constants
kG = 9.8;
kV2 = 40.0;
kAA = 100;
kAB = 100;
kBB = 100;

// Class of Force
function Force() {

}

// Define spring force
Force.spri = function(p1, p2, iN) {
	var f;
	var r1 = p1.r;
	var r2 = p2.r;
	var r = Vect3.sub(r1, r2);
	if((p1.m == m1) && (p2.m == m2)){
		f = Vect3.mul(-kAA, r);
	}
	else if((p1.m == m2) && (p2.m == m2)){
		f = Vect3.mul(-kBB, r);
	}
	else{
		f = Vect3.mul(-kAB, r);
	}
	return f;
}

// Define gravitation force
Force.grav = function(p) {
	var m = p.m;
	var r = new Vect3(0, -1, 0);
	var f = Vect3.mul(kG * m, r);
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
	Aufa Nu'man Fadhilah Rudiawan | aufa.numan@students.itb.ac.id
	Sparisoma Viridi | dudung@gmail.com
	
	20170215
	Start this library.
	20180528
	Create 'Simpan Koordinat' button.
*/

function layout() {
	// Create left division
	var ldiv = document.createElement("div");
	document.body.appendChild(ldiv);
	ldiv.style.border = "0px black solid";
	ldiv.style.height = "auto";
	ldiv.style.float = "left";
	ldiv.style.width = "auto";
	
	// Create right division
	var rdiv = document.createElement("div");
	document.body.appendChild(rdiv);
	rdiv.style.border = "0px black solid";
	rdiv.style.height = "auto";
	rdiv.style.float = "left";
	
	// Create text area for output
	var ta = document.createElement("textarea");
	rdiv.appendChild(ta);
	ta.style.color = "black";
	ta.style.background = "white";
	ta.rows = "30";
	ta.cols = "60";
	ta.style.overflowY = "scroll";
	ta.style.display = "block";	
	ta.id = "hout";
	
	// Create canvas for drawing
	var c = document.createElement("canvas");
	ldiv.appendChild(c);
	c.id = "canvas";
	c.style.border = "1px solid #999";
	c.style.background = "white";
	c.width = "640";
	c.height = "480";
	//c.style.float = "left";
	var ctx = c.getContext("2d");
	
	// Prepare canvas
	setCanvasCoordinates("canvas");
	setWorldCoordinates(0, 0, 12, 12);
	
	// Create start button
	var b1 = document.createElement("button");
	rdiv.appendChild(b1);
	b1.innerHTML = "Mulai";
	b1.onclick = function() {
		if(b1.innerHTML == "Mulai") {
			b1.innerHTML = "Berhenti";
			timer1 = setInterval(run, 1);
		} else {
			b1.innerHTML = "Mulai";
			clearInterval(timer1);
		}
	}
	
	// Create save picture Button
	var b2 = document.createElement("button");
	rdiv.appendChild(b2);
	b2.innerHTML = "Simpan Gambar";
	b2.onclick = function() {
		var canvas = document.getElementById("canvas");
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		var fileNameToSaveAs = "image";
		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		window.location.href = image;
	}

	// Create save text Button
	var b3 = document.createElement("button");
	rdiv.appendChild(b3);
	b3.innerHTML = "Simpan Koordinat";
	b3.onclick = function() {
		var textToWrite = document.getElementById("hout").value;
		var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
		var fileNameToSaveAs = "text";

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		if (window.webkitURL != null)
		{
			// Chrome allows the link to be clicked
			// without actually adding it to the DOM.
			downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
		}
		else
		{
			// Firefox requires the link to be added to the DOM
			// before it can be clicked.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}

		downloadLink.click();
	}
}



/*
<h1>Rantai Butiran Magnetik Terentang Horizontal</h1>
<p>Tugas Akhir 2 | Aufa Nu'man Fadhilah Rudiawan - 10214073</p>
*/

layout();

var timer1;
var S = 8.5;
var N = 22;
var grains = new Array(N);
var m1 = 0.56573;
var c1 = "#f00";
var m2 = 0.56573;
var c2 = "#00f";
var D = 0.5;

initiate();

function initiate() {
	Mdynamics.setdt(1e-2);
	
	var x0 = 0.25;
	var y0 = 10.5;
	var xN = 8.34;
	var yN = 10.80;
	var y = y0;
	var A = 0;
	var a = m1;
	var b = c2;
	var i = 0;

	for(var iN = 1; iN < N; iN++) {
		grains[i] = new Grain;
		grains[i].i = i;
		var x = x0 + (iN - 1) * (S/N);
		grains[i].r = new Vect3(x, y, 0);
		var cR = 128;
		var cG = (16 - i) * 16;
		var cB = i * 16;
		if(i%A == 0) {
			if(a == m1){
				a = m2;
				b = c2;
			}
			else if(a == m2){
				a = m1;
				b = c1;
			}
		}
		grains[i].m = a;
		grains[i].c = b;
		grains[i].D = 0.9 * D;
		i++;
	}

		grains[0] = new Grain;			
		grains[0].i = 0;
		grains[0].r = new Vect3 (x0, y0, 0);
		grains[0].m = a;
		grains[0].c = b;
		grains[0].D = 0.9 * D;
		plotParticle(grains[0]);
		
		grains[N - 1] = new Grain;
		grains[N - 1].i = N - 1;
		grains[N - 1].r = new Vect3 (xN, yN, 0);
		grains[N - 1].m = a;
		grains[N - 1].c = b;
		grains[N - 1].D = 0.9 * D;
		plotParticle(grains[N - 1]);
				
	for(var iN = 1; iN < N - 1; iN++) {
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
		var f = Force.grav(grains[iN]);
		SF[iN] = Vect3.add(SF[iN], f);
	}
		
	//Calculate spring force
	for(var iN = 1; iN < N - 1; iN++) {
		var f1 = Force.spri(grains[iN], grains[iN - 1], iN);
		var f2 = Force.spri(grains[iN], grains[iN + 1], iN);
		SF[iN] = Vect3.add(SF[iN], f1);
		SF[iN] = Vect3.add(SF[iN], f2);
	}					

	var str = "S = " + S + " cm\n";
	str += "k = " + kAA + "\n";
	str += "t = " + t + " s\n";
	str += "i\tx\ty\n";
	for(var i = 0; i < N; i++) {
		str += i + "\t" + grains[i].r.x + "\t" + grains[i].r.y + "\n";
	}
	var hout = document.getElementById("hout");
	hout.innerHTML = str;
	
	clearCurrentFigure();
	for(var iN = 0; iN < N; iN++) {
		plotParticle(grains[iN]);
	}
	
	for(var iN = 1; iN < N - 1; iN++) {
		Mdynamics.Euler(SF[iN], grains[iN]);
	}
	Mdynamics.inct();
}
