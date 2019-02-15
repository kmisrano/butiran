/*
	abmWorld.js
	Matrix of 2-d world of ABM
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="abmWorld.js"></script>
	
	20190215
	1852 Start at home mit ein bisschen noch krank beim Fuss.
	
	References
	1. Thinnest lineWidth is 1
	url https://stackoverflow.com/q/35304794/9475509
*/

// Define global variables
var W, can;

// Execute main function
main();

// Define main function
function main() {
	W = createWorldMatrix();
	var NW = W.length;
	var MW = W[0]. length;
	
	var boxSize = 20;
	can = createCanvas(MW, NW, boxSize);
	document.body.append(can);
	
	drawMatrixOnCanvas(W, can);
}

// Draw a matrix on a canvas
function drawMatrixOnCanvas() {
	var M = arguments[0];
	var can = arguments[1];
	var cx = can.getContext("2d");
	var s = can.height / M.length;
	console.log(s);
	for(var i = 0; i < M.length; i++) {
		for(var j = 0; j < M[i].length; j++) {
			var x = j * s;
			var y = i * s;
			var cR = (1 - M[i][j]) * 255;
			var cG = (1 - M[i][j]) * 255;
			var cB = (1 - M[i][j]) * 255;
			cx.fillStyle = "rgb(" + cR + "," + cG + "," + cB + ")";
			cx.fillRect(x, y, s, s);
			cx.stroke();
			
			cx.strokeStyle = "#ccc";
			cx.lineWidth = 1;
			cx.rect(x, y, s, s);
			cx.stroke();
		}
	}
}


// Create world canvas according to worl matrix size
function createCanvas() {
	var width = arguments[0] * arguments[2];
	var height = arguments[1] * arguments[2];
	var can = document.createElement("canvas");
	can.width = width;
	can.height = height;
	can.style.width = width + "px";
	can.style.height = height + "px";
	return can;
}

// Create world matrix
function createWorldMatrix() {
	var M = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],	
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],	
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	];
	return M;
}