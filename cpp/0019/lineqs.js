/*
	lineqs.js
	Solve system of linear equations
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="lineqs.js"></script>
	
	20190130
	1931 Start at home.
	20190201
	0613 Fin @home.
*/

// Define global variables
var tin, btn, tout, tlog, M;
var zero = 100, epsZero = 1E-10, digit = 4;

// Execute main function
main();

// Define main function
function main() {
	// Create layout of visual elements
	createLayout(tin, btn, tout, tlog);
	
	// Display initialize values of SLE
	initSLE(tin);	
}

// When Solve button clicked
function solve() {
	// Clear tlog and tout
	tlog.value = "";
	tout.value = "";
	
	// Read array from textarea
	M = readArray(tin);
	textOut(tlog, "# Initial matrix\n")
	textOut(tlog, M);
	
	// Solve SLE from M
	var solution = solveSLE(M);
	textOut(tout, solution, zero);
}

// Get zero
function getZero(M) {
	for(var r = 0; r < M.length; r++) {
		for(var c = 0; c < M[r].length; c++) {
			var cell = Math.abs(M[r][c]);
			if(0 < cell && cell < epsZero) {
				zero = M[r][c];
			}
		}
	}
}

// Solve SLE from an augmented matrix
function solveSLE() {
	var M = arguments[0];

	// Zero column C other than row R of matrix M
	for(var R = 0; R < M.length; R++) {
		var C = R;
		zeroColumnBelowRow(C, R, M);
		textOut(tlog, "# Zero column " + (C + 1)
			+ " other than row " + (R + 1) + "\n");
		textOut(tlog, M);
		textOut(tlog, "\n");
	}
	
	// One column C row R of matrix M
	for(var R = M.length - 1; R >= 0; R--) {
		var C = R;
		oneColumnRow(C, R, M);
		textOut(tlog, "# One column " + (C + 1)
			+ " row " + (R + 1) + "\n");
		textOut(tlog, M);
		textOut(tlog, "\n");
	}
	
	// Zero row R other than diagonal of matrix M
	for(var R = M.length - 1; R >= 0; R--) {
		var C = R;
		zeroColumnAboveRow(C, R, M);
		textOut(tlog, "# Zero row " + (R + 1)
			+ " other than diagonal\n");
		textOut(tlog, M);
		textOut(tlog, "\n");
	}
	
	// Return results
	getZero(M);
	zero = parseFloat(zero.toExponential(digit));
	var Mout = [];
	for(var r = 0; r < M.length; r++) {
		var lastColumn = [M[r][M[r].length - 1], zero];
		Mout.push(lastColumn);
	}
	return Mout;
}

// Zero other than diagonal of matrix M
function zeroColumnAboveRow(C, R, M) {
	for(var r = R - 1; r >= 0; r--) {
		var piv = M[r][C];
		for(var c = M[R].length - 1; c >= 0; c--) {
			M[r][c] -= (piv / M[R][C]) * M[R][c];
		}
	}
}

// One column C row R of matrix M
function oneColumnRow(C, R, M) {
	var piv = M[R][C];
	for(var c = 0; c < M[R].length; c++) {
		M[R][c] /= piv;
	}
}

// Zero column C other than row R of matrix M
function zeroColumnBelowRow(C, R, M) {
	for(var r = R + 1; r < M.length; r++) {
		var piv = M[r][C];
		for(var c = 0; c < M[R].length; c++) {
			M[r][c] -= (piv / M[R][C]) * M[R][c];
		}
	}
}

// Read array from textarea
function readArray() {
	ta = arguments[0];
	var rows = ta.value.split("\n");
	var R = rows.length;
	if(rows[R-1] == 0) {
		R--;
	}
	var mat = [];
	for(var r = 0; r < R; r++) {
		var columns = rows[r].split("\t");
		var C = columns.length;
		var arow = [];
		for(var c = 0; c < C; c++) {
			arow.push(parseFloat(columns[c]));
		}
		mat.push(arow);
	}
	return mat;
}

// Display initialize values of SLE
function initSLE() {
	var ta = arguments[0];
	textOut(ta, "1\t1\t1\t1\t1\t15\n");
	textOut(ta, "2\t-1\t1\t1\t2\t17\n");
	textOut(ta, "1\t3\t1\t-2\t4\t22\n");
	textOut(ta, "5\t-4\t-3\t2\t1\t1\n");
	textOut(ta, "3\t2\t1\t-1\t-2\t-4\n");
}

// Add text to textarea
function textOut() {
	ta = arguments[0];
	var x = arguments[1];
	if(x[0].length == 1) {
		ta.value += arguments[1];
	} else {
		var M = x;
		for(var r = 0; r < M.length; r++) {
			for(var c = 0; c < M[r].length; c++) {
				if(arguments.length < 3) {
					ta.value += parseFloat(M[r][c].toFixed(digit));
				} else {
					ta.value += M[r][c];
				}
				if(c < M[r].length - 1) {
					ta.value += "\t";
				} else {
					ta.value += "\n";
				}
			}
		}
	}
	ta.scrollTop = ta.scrollHeight;	
}

// Create layout of visual elements
function createLayout() {
	// Create 1st visual element
	tin = arguments[0];
	tin = document.createElement("textarea");
	tin.style.width = "400px";
	tin.style.height = "150px";
	tin.style.overflowY = "scroll";
	tin.style.float = "left";
	
	// Create 2nd visual element
	btn = arguments[1];
	btn = document.createElement("button");
	btn.innerHTML = "Solve";
	btn.style.float = "left";
	btn.addEventListener("click", solve);
	
	// Create 3rd visual element
	tout = arguments[2];
	tout = document.createElement("textarea");
	tout.style.width = "150px";
	tout.style.height = "150px";
	tout.style.overflowY = "scroll";
	tout.style.float = "left";
	
	// Create 4th visual element
	tlog = arguments[3];
	tlog = document.createElement("textarea");
	tlog.style.width = "605px";
	tlog.style.height = "300px";
	tlog.style.overflowY = "scroll";
	tlog.style.float = "left";
	tlog.style.background = "#000";
	tlog.style.color = "#aaa";
	
	// Arrange elements
	document.body.append(tin);
	document.body.append(btn);
	document.body.append(tout);
	document.body.append(tlog);
}

