/*
	abmDirection.js
	Matrix of 2-d direction of ABM
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="abmWorld.js"></script>
	
	20190216
	0503 Start at home derived from abmWorld.js file.
	
	References
	1. Hexadesimal in JS
	url https://www.w3schools.com/js/js_numbers.asp
	2. Linear gradient fill
	url https://www.w3schools.com/tags
	/canvas_createlineargradient.asp
*/

// Define global variables
var D, can;

// Execute main function
main();

// Define main function
function main() {
	D = createDirectionMatrix();
	var ND = D.length;
	var MD = D[0]. length;
	
	var boxSize = 20;
	can = createCanvas(MD, ND, boxSize);
	document.body.append(can);
	
	drawMatrixOnCanvas(D, can, 1);
}

// Draw a matrix on a canvas
function drawMatrixOnCanvas() {
	var M = arguments[0];
	var can = arguments[1];
	var cx = can.getContext("2d");
	var s = can.height / M.length;
	
	var colorScheme = arguments[2];
	
	for(var i = 0; i < M.length; i++) {
		for(var j = 0; j < M[i].length; j++) {
			var x = j * s;
			var y = i * s;
			
			var cR, cG, cB;
			if(colorScheme == 0) {
				cR = (1 - M[i][j]) * 255;
				cG = (1 - M[i][j]) * 255;
				cB = (1 - M[i][j]) * 255;
				cx.fillStyle =
					"rgb(" + cR + "," + cG + "," + cB + ")";
				cx.beginPath();
				cx.fillRect(x, y, s, s);
				cx.stroke();
			} else if(colorScheme == 1) {
				var k = M[i][j];
				
				var sx = [+0, +0, +1, +1, +1, +0, -1, -1, -1];
				var sy = [+1, +1, +0, +0, -1, -1, -1, +0, +1];
				
				var xx = x + 0.5 * s;
				var yy = y + 0.5 * s;
				var dx = sx[k] * 0.5 * s;
				var dy = sy[k] * 0.5 * s;
			}
						
			cx.lineWidth = 1;
			cx.strokeStyle = "#eee";
			cx.rect(x, y, s, s);
			cx.stroke();
		}
	}
}

// Create world canvas according to world matrix size
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
function createDirectionMatrix() {
	var M = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 2, 3, 3, 4, 0, 2, 3, 3, 4, 0],
		[0, 1, 0, 0, 5, 0, 1, 0, 0, 5, 0],
		[0, 1, 0, 0, 5, 0, 1, 0, 0, 5, 0],
		[0, 1, 0, 0, 4, 3, 2, 0, 0, 5, 0],
		[0, 1, 0, 0, 6, 7, 8, 0, 0, 5, 0],
		[0, 1, 0, 0, 5, 0, 1, 0, 0, 5, 0],
		[0, 1, 0, 0, 5, 0, 1, 0, 0, 5, 0],
		[0, 8, 7, 7, 6, 0, 8, 7, 7, 6, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];
	return M;
}
