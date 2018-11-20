/*
	vd_ta2ca.js
	Visualize data from textarea to canvas
	
	Sparisoma Viridi | dudung@gmail.com
	
	20171215
	Create this script, which is called from index.html and
	nothing works.
	20171216
	Add event onClick using addEventListener and it works.
	Element can be hidden using style.visibility = "hidden"
	but it still takes place or style.display = "none", which
	is better.
	20181120
	Integrate to butiran.
*/



/*
	draw2d.js
	Draw in 2d using canvas
	
	Sparisoma Viridi | dudung@gmail.com
	
	20171216
	Create this script and can set color, draw a pixel,
	draw text, and clear canvas.
*/

// Define real coordinates
var xmin = 0;
var ymin = 0;
var xmax = 1;
var ymax = 1;

// Define drawing coordinates
var XMIN = 0;
var YMIN = 0;
var XMAX = 1;
var YMAX = 1;

// Define canvas id
var canvasId = "";

// Set real coordinates
function setRealCoordinate(x1, y1, x2, y2) {
	xmin = x1;
	ymin = y1;
	xmax = x2;
	ymax = y2;
}

// Set drawing coordinates
function setDrawingCoordinate(X1, Y1, X2, Y2) {
	var can = document.getElementById(canvasId);
	XMIN = X1;
	YMIN = Y1;
	XMAX = X2;
	YMAX = Y2;
}

// Set canvas id
function setCanvasId(canvasid) {
	canvasId = canvasid;
}

// Transform x linearly
function ltrX(x) {
	var X = (x - xmin) / (xmax - xmin) * (XMAX - XMIN) + XMIN;
	return X;
}

// Transform y linearly
function ltrY(y) {
	var Y = (y - ymin) / (ymax - ymin) * (YMAX - YMIN) + YMIN;
	return Y;
}

// Set fill style
function setFillStyle(r, g, b) {
	var can = document.getElementById(canvasId);
	var cx = can.getContext("2d");
	cx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";	
}

// Set stroke style
function setStrokeStyle(r, g, b) {
	var can = document.getElementById(canvasId);
	var cx = can.getContext("2d");
	cx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";	
}

// Draw a pixel
function drawPixel(x, y) {
	var X = ltrX(x);
	var Y = ltrY(y);
	var can = document.getElementById(canvasId);
	var cx = can.getContext("2d");
	cx.fillRect(X, Y, 1, 1);
}

// Draw a circle
function drawCircle(x, y, r) {
	var X = ltrX(x);
	var Y = ltrY(y);
	var R = ltrX(x + r) - ltrX(x);
	var can = document.getElementById(canvasId);
	var cx = can.getContext("2d");
	cx.beginPath();
	cx.arc(X, Y, R, 0, 2 * Math.PI)
	cx.stroke();
}

// Draw text
function drawText(x, y, someText) {
	var X = ltrX(x);
	var Y = ltrY(y);
	var can = document.getElementById(canvasId);
	var cx = can.getContext("2d");
	cx.textAlign = "center";
	cx.fillText(someText, X, Y);	
}

// Clear canvas
function clearDrawing() {
	var can = document.getElementById(canvasId);
	var cx = can.getContext("2d");
	cx.fillStyle = "#fff";
	cx.clearRect(0, 0, XMAX, YMIN);
}



layout();


function layout() {
	// Set system coordinates and canvas id
	setRealCoordinate(0, 0, 100, 100);
	setCanvasId("canvas1")
	setDrawingCoordinate(0, 300, 300, 0);
	
	// Add text area for input
	var ta1 = document.createElement("textarea");
	ta1.id = "textarea1";
	ta1.style.width = "220px";
	ta1.style.height = (YMIN - 4) + "px";
	ta1.style.overflowY = "scroll";
	document.body.appendChild(ta1);
	
	// Add canvas for visualizing input
	var can1 = document.createElement("canvas");
	can1.id = canvasId;
	can1.width = XMAX;
	can1.height = YMIN;
	can1.style.width = XMAX + "px";
	can1.style.height = YMIN + "px";
	can1.style.border = "1px solid #999";
	document.body.appendChild(can1);
	
	// Add paragraph for storing an integer value
	var t1 = document.createElement("text");
	t1.innerHTML = "<br/>"
	document.body.appendChild(t1);

	// Add a button for loading
	var btn1 = document.createElement("button");
	btn1.innerHTML = "Load";
	btn1.id = "button1"
	btn1.addEventListener("click", click1);
	document.body.appendChild(btn1);
	
	// Add a button
	var btn2 = document.createElement("button");
	btn2.innerHTML = "Draw";
	btn2.id = "button2"
	btn2.addEventListener("click", click2);
	document.body.appendChild(btn2);
}

function loadTestContent(textareaId) {
	var ta = document.getElementById(textareaId);
	ta.value = "city00\t10\t10\t10\n";
	ta.value += "city01\t20\t50\t5\n";	
	ta.value += "city02\t50\t30\t20\n";	
}

function drawContent(textareaId, canvasId) {
	var can = document.getElementById(canvasId);
	var ta = document.getElementById(textareaId);

	var rows = ta.value.split("\n");
	var N = rows.length;
	if(rows[N-1].length == 0) {
		N = N - 1;
	}
	var n = new Array(N);
	var x = new Array(N);
	var y = new Array(N);
	var r = new Array(N);
	for(var i = 0; i < N; i++) {
		var cols = rows[i].split("\t");
		n[i] = cols[0];
		x[i] = parseFloat(cols[1]);
		y[i] = parseFloat(cols[2]);
		r[i] = parseFloat(cols[3]);
	}
	
	for(var i = 0; i < N; i++) {
		setStrokeStyle(255, 0, 0);
		drawCircle(x[i], y[i], r[i]);
		setFillStyle(0, 0, 255);
		drawText(x[i], y[i], n[i]);
	}
}

function click1() {
	loadTestContent("textarea1");
}

function click2() {
	clearDrawing();
	drawContent("textarea1", "canvas1");
}



