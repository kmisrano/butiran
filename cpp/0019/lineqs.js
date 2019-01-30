/*
	lineqs.js
	Solve system of linear equations
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="lineqs.js"></script>
	
	20190130
	1931 Start at home.
*/

// Define global variables
var tin, btn, tout;

// Execute main function
main();

// Define main function
function main() {
	// Create layout of visual elements
	createLayout(tin, btn, tout);
	
	// Display initialize values of SLE
	initSLE(tin);
	
	// Read array from textarea
	var M = readArray(tin);
	
	// Solve SLE from M
	var solution = solveSLE(M);
}

// Solve SLE from an augmented matrix
function solveSLE() {
	var M = arguments[0];
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
	ta.value += arguments[1];
	ta.scrollTop = ta.scrollHeight;
}

// Create layout of visual elements
function createLayout() {
	// Create 1st visual element
	tin = arguments[0];
	tin = document.createElement("textarea");
	tin.style.width = "350px";
	tin.style.height = "150px";
	tin.style.overflowY = "scroll";
	tin.style.float = "left";
	
	// Create 2nd visual element
	btn = arguments[1];
	btn = document.createElement("button");
	btn.innerHTML = "Solve";
	btn.style.float = "left";
	
	// Create 3rd visual element
	tout = arguments[2];
	tout = document.createElement("textarea");
	tout.style.width = "200px";
	tout.style.height = "150px";
	tout.style.overflowY = "scroll";
	tout.style.float = "left";
	
	// Arrange elements
	document.body.append(tin);
	document.body.append(btn);
	document.body.append(tout);
}

