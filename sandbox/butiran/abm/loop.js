/*
	loop.js
	Loop for ABM-based simulation
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180501
	Create this object.
	Forget upload home script and recreate it in campus.
	There is bug in drawing the loop, which is only working for
	N = 8.
	Bug is fixed at about 2125.
*/

// Define class of gate
class abmLoop {
	constructor() {
		this.id = "loop1";
		this.path = arguments[0];
		this.color = "#f00";
		
		// Define constructor with one argument of types
		if(arguments.length == 1) {
			var arg = arguments[0];
			if(arg.id != undefined) {
				this.id = arg.id;
			}
			if(arg.path != undefined) {
				this.path = arg.path;
			}
			if(arg.color != undefined) {
				this.color = arg.color;
			}
		}
	}
	
	// Draw loop
	drawOnCanvas(canvasId) {
		if(this.path != undefined) {
			var canvas = document.getElementById(canvasId);
			var ctx = canvas.getContext("2d");
			ctx.strokeStyle = this.color;
			var x = this.path.x;
			var y = this.path.y;
			var N = Math.min(x.length, y.length);
			ctx.beginPath();
			for(var i = 0; i < N; i++) {
				if(i == 1) {
					ctx.moveTo(x[i], y[i]);
				} else {
					ctx.lineTo(x[i], y[i]);
				}
			}
			ctx.closePath();
			ctx.stroke();
		}
	}
}

// Generate rectangular path
function generateRectangularPath(xc, yc, Sa, Sb, N) {
	var xx = [];
	var yy = [];
	var ibeg = 0;
	var iend = 360;
	var di = (iend - ibeg) / 4;
	for(var i = ibeg; i < iend; i += di) {
		var j = Math.floor(i / 90);
		var theta = (j * 90) * Math.PI / 180;
		var kbeg = 0;
		var kend = N / 4;
		var dSa = Sa / kend;
		var dSb = Sb / kend;
		for(var k = kbeg; k < kend; k++) {
			var x = 0;
			var y = 0;
			if(j == 0) {
				x = xc + 0.5 * Sa;
				y = yc - 0.5 * Sb + k * dSb;
			} else if(j == 1) {
				x = xc + 0.5 * Sa - k * dSa;
				y = yc + 0.5 * Sb;
			} else if(j == 2) {
				x = xc - 0.5 * Sa;
				y = yc + 0.5 * Sb - k * dSb;
			} else if(j == 3) {
				x = xc - 0.5 * Sa + k * dSa;
				y = yc - 0.5 * Sb;
			}
			xx.push(x);
			yy.push(y);
		}
	}
	var path = {x: xx, y: yy};
	return path;
}

// Generate square path
function generateSquarePath(xc, yc, S, N) {
	var xx = [];
	var yy = [];
	var ibeg = 0;
	var iend = 360;
	var di = (iend - ibeg) / 4;
	for(var i = ibeg; i < iend; i += di) {
		var j = Math.floor(i / 90);
		var theta = (j * 90) * Math.PI / 180;
		var kbeg = 0;
		var kend = N / 4;
		var dS = S / kend;
		console.log(kend);
		for(var k = kbeg; k < kend; k++) {
			var x = 0;
			var y = 0;
			if(j == 0) {
				x = xc + 0.5 * S;
				y = yc - 0.5 * S + k * dS;
			} else if(j == 1) {
				x = xc + 0.5 * S - k * dS;
				y = yc + 0.5 * S;				
			} else if(j == 2) {
				x = xc - 0.5 * S;
				y = yc + 0.5 * S - k * dS;				
			} else if(j == 3) {
				x = xc - 0.5 * S + k * dS;
				y = yc - 0.5 * S;				
			}
			xx.push(x);
			yy.push(y);
		}
	}
	var path = {x: xx, y: yy};
	return path;
}

// Generate elliptical path
function generateEllipticPath(xc, yc, Ra, Rb, N) {
	var xx = [];
	var yy = [];
	var ibeg = 0;
	var iend = 360;
	var di = (iend - ibeg) / N;
	for(var i = ibeg; i <= iend; i += di) {
		var theta = i * Math.PI / 180;
		var x = xc + Ra * Math.cos(theta);
		var y = yc + Rb * Math.sin(theta);
		xx.push(x);
		yy.push(y);
	}
	var path = {x: xx, y: yy};
	return path;
}

// Generate circular path
function generateCircularPath(xc, yc, R, N) {
	var xx = [];
	var yy = [];
	var ibeg = 0;
	var iend = 360;
	var di = (iend - ibeg) / N;
	for(var i = ibeg; i <= iend; i += di) {
		var theta = i * Math.PI / 180;
		var x = xc + R * Math.cos(theta);
		var y = yc + R * Math.sin(theta);
		xx.push(x);
		yy.push(y);
	}
	var path = {x: xx, y: yy};
	return path;
}
