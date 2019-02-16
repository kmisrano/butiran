/*
	abmWorldDirs.js
	Matrices of 2-d world and directions of ABM
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="abmWorldDirs.js"></script>
	
	20190216
	0934 Start at home derived from abmDirection.js file.	
*/

// Define global variables
var W, D1, D2, D3, can;

// Execute main function
main();

// Define main function
function main() {
	W = createWorldMatrix();
	D1 = createDirectionMatrix1();
	D2 = createDirectionMatrix2();
	D3 = createDirectionMatrix3();
	var NW = W.length;
	var MW = W[0]. length;
	
	var boxSize = 20;
	can = createCanvas(MW, NW, boxSize);
	document.body.append(can);
	
	drawMatrixOnCanvas(W, can, 0);
	drawMatrixOnCanvas(D1, can, 1);
	drawMatrixOnCanvas(D2, can, 1);
	drawMatrixOnCanvas(D3, can, 1);
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
				
				//        OR  NO  NE   EA  SE   SO  SW   WE  NW
				var sx = [+0, +0, +.7, +1, +.7, +0, -.7, -1, -.7];
				var sy = [+0, +1, +.7, +0, -.7, -1, -.7, +0, +.7];
				
				var xx = x + 0.5 * s;
				var yy = y + 0.5 * s;
				var dx = sx[k] * 0.5 * s;
				var dy = sy[k] * 0.5 * s;
				
				cx.beginPath();
				cx.moveTo(xx, yy);
				cx.lineTo(xx + dx , yy - dy);
				cx.lineWidth = 2;
				cx.strokeStyle = "#00f";
				cx.stroke();
				
				cx.beginPath();
				cx.arc(xx, yy, 1, 0, 2 * Math.PI);
				cx.lineWidth = 2;
				cx.strokeStyle = "#f00";
				cx.stroke();
			}
			
			cx.beginPath();
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

// Create direction matrix 1
function createDirectionMatrix1() {
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

// Create direction matrix 2
function createDirectionMatrix2() {
	var M = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 4, 0, 0, 6, 0, 4, 0, 0, 6, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 2, 4, 0, 0, 0, 2, 4, 0, 0],
		[0, 0, 8, 6, 0, 0, 0, 8, 6, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 2, 0, 0, 8, 0, 2, 0, 0, 8, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];
	return M;
}

// Create direction matrix 3
function createDirectionMatrix3() {
	var M = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 3, 0, 0, 0, 1, 3, 0, 0],
		[0, 0, 7, 5, 0, 0, 0, 7, 5, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];
	return M;
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
