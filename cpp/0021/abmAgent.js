/*
	abmAgent.js
	Matrices of 2-d world, directions, and agent of ABM
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="abmAgent.js"></script>
	
	20190216
	1622 Start at home derived from abmWorldDirs.js file.
	1658 Copy randInt() from 0104/randgen.js file.
*/

// Define global variables
var W, D1, D2, A, can, color, N;

// Execute main function
main();

// Define main function
function main() {
	W = createWorldMatrix();
	D1 = createDirectionMatrix1();
	D2 = createDirectionMatrix2();
	var NW = W.length;
	var MW = W[0]. length;
	
	var boxSize = 20;
	can = createCanvas(MW, NW, boxSize);
	document.body.append(can);
	
	N = 9;
	color = defineAgentColor(N);
	A = createAgentMatrixForWorld(W, N);
	
	drawMatrixOnCanvas(W, can, 0);
	drawMatrixOnCanvas(D1, can, 1);
	drawMatrixOnCanvas(D2, can, 1);
	drawMatrixOnCanvas(A, can, 2);
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
			} else if(colorScheme == 2) {
				var k = M[i][j];
				if(k > 0) {
					cx.fillStyle = color[k - 1];
					cx.beginPath();
					cx.fillRect(x, y, s, s);
					cx.stroke();
				}
			}
			
			cx.beginPath();
			cx.lineWidth = 1;
			cx.strokeStyle = "#eee";
			cx.rect(x, y, s, s);
			cx.stroke();
		}
	}
}

// Define agent colors
function defineAgentColor() {
	var N = arguments[0];
	var col = [
		"#c00", "#f00", "#f88",
		"#0c0", "#0f0", "#8f8",
		"#00c", "#00f", "#88f",
	];
	col.length = N;
	return col;
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

// Create zero matrix
function createZeroMatrix() {
	var Ni = arguments[0];
	var Nj = arguments[1];
	var M = [];
	for(var i = 0; i < Ni; i++) {
		var row = [];
		for(var j = 0; j < Nj; j++) {
			row.push(0);
		}
		M.push(row);
	}
	return M;
}

// Create direction agent matrix
function createAgentMatrixForWorld() {
	var N = arguments[1];
	var W = arguments[0];
	var NW = W.length;
	var MW = W[0].length;

	var M = createZeroMatrix(NW, MW);
	
	var k = 0;
	while(k < N) {
		var i = randInt(0, NW - 1);
		var j = randInt(0, MW - 1);
		if(W[i][j] == 0 && M[i][j] == 0) {
			M[i][j] = k + 1;
			k++;
		}
	}
	return M;
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
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 2, 4, 0, 0, 0, 2, 4, 0, 0],
		[0, 0, 8, 6, 0, 0, 0, 8, 6, 0, 0],
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

// Generate a random number between two integers (inclusive)
function randInt() {
	var min = arguments[0];
	var max = arguments[1];
	var range = max - min;
	var num = min + Math.floor((range + 1) * Math.random());
	return num;
}
