/*
	sms2darb.js
	Spring-mass system in 2d in the case arbitrary N springs
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="sms2darb.js"></script>
	
	20190122
	0350 Start creating at home.
	2010 Modify from sms2dperp.js.
	20190123
	0545 Finish this program.
	0825 Derive it from sms2dlin.js
*/

// Define global variables
var h1, btn, ta, can;
var proc, Tproc;
var tbeg, tend, dt, t;
var m, x0, y0, v0x, v0y;
var xo, yo, x, y, vx, vy;
var Ns, ks = [], Ls = [];
var xs = [], ys = [];
var xmin, ymin, xmax, ymax;

// Execute main function
main();

// Define main function
function main() {
	// Create and arrange elements
	createAndArrangeElements();
	
	// Initialize parameters
	initParams();
}

// Initialize parameters
function initParams() {
	// Set iteration parameters
	Tproc = 100;
	tbeg = 0;
	tend = 1;
	dt = 0.002;
	t = tbeg;
	
	// Set physical system parameters of mass m
	m = 0.1;
	xo = 0;
	yo = 0;
	x0 = xo + 0.2;
	y0 = yo;
	v0x = 0;
	v0y = 10;
	
	// Set initial conditions
	x = x0;
	y = y0
	vx = v0x;
	vy = v0y;
	
	// Set springs information
	N = 6;
	var L = 0.4;
	var dq = 2 * Math.PI / N;
	for(var i = 0; i < N; i++) {
		ks[i] = 100;
		Ls[i] = L;
		var q = i * dq;
		var xi = xo + Ls[i] * Math.cos(q);
		var yi = yo + Ls[i] * Math.sin(q);
		xs.push(xi);
		ys.push(yi);
	}
	
	// Set drawing area
	xmin = -0.5;
	ymin = -0.5;
	xmax = 0.5;
	ymax = 0.5;
	
	// Display header information
	ta.value = "# t\tx\ty\tvx\tvy\n";
}

// Perform simulation
function simulate() {
	// Display results on textarea
	ta.value += t.toFixed(3) + "\t" 
		+ x.toFixed(3) + "\t" + y.toFixed(3) + "\t"
		+ vx.toFixed(3) + "\t" + vy.toFixed(3) + "\n";
	ta.scrollTop = ta.scrollHeight;
	
	// Display mass position of canvas
	clearCanvas(can);
	drawMassOnCanvas(x, y, can);
	
	// Implement Euler method
	var ax = 0;
	var ay = 0;
	for(var i = 0; i < N; i++) {
		var w = Math.sqrt(ks[i]/m);
		var sqrt = Math.sqrt(
			(x-xs[i])*(x-xs[i]) + (y-ys[i])*(y-ys[i])
		);
		console.log(sqrt);
		var del = (sqrt - Ls[i]) / sqrt;
		
		ax += -(w*w) * del * (x - xs[i]);
		ay += -(w*w) * del * (y - ys[i]);
	}

	vx = vx + ax*dt;
	x = x + vx*dt;
	
	vy = vy + ay*dt;
	y = y + vy*dt;
	
	// Terminate simulation if condition meets		
	if(t >= tend - dt) {
		clearInterval(proc);
		btn.innerHTML = "Start";
		btn.disabled = true;
	} else {
		t +=dt;
	}
}

// Clear canvas
function clearCanvas(can) {
	var cx = can.getContext("2d");
	cx.clearRect(0, 0, can.width, can.height);
}

// Display mass position of canvas
function drawMassOnCanvas(x, y, can) {
	var cx = can.getContext("2d");
	
	// Get canvas coordinate
	var XMIN = 0;
	var YMIN = can.height;
	var XMAX = can.width;
	var YMAX = 0;
	
	// Draw spring ki
	for(var i = 0; i < N; i++) {
		
		// Calculate current length
		var dist = Math.sqrt(
			(x-xs[i])*(x-xs[i]) + (y-ys[i])*(y-ys[i])
		);
		
		// Set length dependent line thickness
		var lw = 6;
		var sc = (dist / Ls[i] / 0.5);
		lw /= sc;
		
		// Set length dependent color
		var cG = 0;
		var cR = ((1.0 - dist / Ls[i]) * 255) * 1.0/0.25;
		var cB = ((dist / Ls[i] - 1.0) * 255) * 1.0/0.25;
		var color = "rgb(" + cR + ", " + cG + ", " + cB + ")";
		
		// Draw line
		cx.beginPath();
		cx.strokeStyle = color;
		cx.moveTo(tx(x), ty(y));
		cx.lineTo(tx(xs[i]), ty(ys[i]));
		cx.lineWidth = lw;
		cx.stroke();
		
		// Draw fixed point
		cx.beginPath();
		cx.lineWidth = 1;
		cx.strokeStyle = "#000";
		cx.arc(tx(xs[i]), ty(ys[i]), 2, 0, 2*Math.PI);
		cx.stroke();
		cx.fillStyle = "#555";
		cx.fill();
	}
	
	// Draw mass
	var R = 10;
	cx.beginPath();
	cx.strokeStyle = "#000";
	cx.arc(tx(x), ty(y), R, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = "#ccc";
	cx.fill();
	cx.beginPath();
	cx.strokeStyle = "#000";
	cx.arc(tx(x), ty(y), 2, 0, 2*Math.PI);
	cx.stroke();
	cx.fillStyle = "#000";
	cx.fill();
	
	// Transform x from real coordinate to canvas coordinate
	function tx(x) {
		var xx = (x - xmin) / (xmax - xmin) * (XMAX - XMIN) + XMIN;
		return xx;
	}
	
	// Transform y from real coordinate to canvas coordinate
	function ty(y) {
		var yy = (y - ymin) / (ymax - ymin) * (YMAX - YMIN) + YMIN;
		return yy;
	}
}

// Create and arrange elements
function createAndArrangeElements() {
	// Create text with style h1
	h1 = document.createElement("h1");
	h1.innerHTML = "Multi springs and a mass";
	
	// Create start button
	btn = document.createElement("button");
	btn.innerHTML = "Start";
	btn.style.width = "48px";
	btn.style.float = "left";
	btn.addEventListener("click", btnClick);
		
	// Create output textarea
	ta = document.createElement("textarea");
	ta.style.width = "300px";
	ta.style.height = "296px";
	ta.style.overflowY = "scroll";
	
	// Create a canvas
	can = document.createElement("canvas");
	can.width = "300";
	can.height = "300";
	can.style.width = can.width + "px";
	can.style.height = can.height + "px";
	can.style.border = "1px solid #ccc";
	
	// Arrange elements
	document.body.append(h1);
	document.body.append(btn);
	document.body.append(ta);
	document.body.append(can);
}

// Handle button click event
function btnClick() {
	var cap = event.target.innerHTML;
	if(cap == "Start") {
		console.log("Start");
		event.target.innerHTML = "Stop";
		proc = setInterval(simulate, Tproc);
	} else {
		console.log("Stop");
		event.target.innerHTML = "Start";
		clearInterval(proc);
	}
}
