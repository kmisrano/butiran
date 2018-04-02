/*
	drawyeast2d.js
	Set drawing environment with ages differences in 2d using canvas object
	Sparisoma Viridi | dudung@gmail.com
	Dimas Praja Purwa Aji | dmspraja2105@gmail.com

	20170117
	draw2d.js last modification
	20180303
	Add ages variable for differences in grain coloring
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
	var age = p.A;

	var xx = transX(x);
	var yy = transY(y);
	var DD = transX(D) - transX(0);

	if(age >= 2000){
		var greenValue = 20;
		var blueValue = 20;
	} else {
		var greenValue = 200 - Math.floor(0.09 * age);
		var blueValue = 200 - Math.floor(0.09 * age);
	}

	var c = document.getElementById(currentFigure);
	var ctx = c.getContext("2d");
	ctx.strokeStyle = p.c;
	ctx.lineWidth = 0;
	ctx.beginPath();
	ctx.arc(xx, yy, 0.5 * DD, 0, 2 * Math.PI);
	ctx.fillStyle = "#"+(255).toString(16)+(greenValue).toString(16)+(blueValue).toString(16);
	ctx.fill();
	ctx.stroke();

	if(age >= 2000){
		ctx.font = "10px Times New Roman"
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.textBaseline="middle";
		ctx.fillText(p.i, xx, yy);
	}
}

//Plot liner
function plotLiner(p) {
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