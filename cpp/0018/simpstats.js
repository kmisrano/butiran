/*
	simpstats.js
	Some simple statistics function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="simpstats.js"></script>
	
	20190128
	1729 Start at home.
	
	Note:
	Results require browser console with can be opened with
	buttons combination CTRL+SHIFT+J.
*/

// Define global variable
var ta;

// Execute main function
main();

// Define main function
function main() {
	// Create textarea
	createOutput();
	
	// Define data in array form
	var x = [2, 3, 5, 9, 7, 8, 1];
	tout("x = " + x.toString().replace(/,/g, ', ') + "\n");
	
	// Get minimum
	var xmin = min(x);
	tout("xmin = " + xmin + "\n");
	
	// Get maximum
	var xmax = max(x);
	tout("xmax = " + xmax + "\n");
	
	// Calculate avarage
	var xavg = avg(x);
	tout("xavg = " + xavg + "\n");	
	
	// Calculate standard deviation
	var sigma = stdev(x);
	tout("sigma = " + sigma + "\n");	
}

// Calculate average value of array components
function stdev() {
	var x = arguments[0];
	var N = x.length;
	var xavg = avg(x);
	var s2 = 0;
	for(var i = 0; i < N; i++) {
		var dx = (x[i] - xavg);
		s2 += dx*dx;
	}
	var xdev = Math.sqrt(s2 / (N - 1));
	return xdev;
}

// Calculate average value of array components
function stdev() {
	var x = arguments[0];
	var N = x.length;
	var xavg = avg(x);
	var s2 = 0;
	for(var i = 0; i < N; i++) {
		var dx = (x[i] - xavg);
		s2 += dx*dx;
	}
	var xdev = Math.sqrt(s2 / (N - 1));
	return xdev;
}

// Calculate average value of array components
function avg() {
	var x = arguments[0];
	var N = x.length;
	var sx = 0;
	for(var i = 0; i < N; i++) {
		sx += x[i];
	}
	var xavg = sx / N;
	return xavg;
}

// Get maximum value of an array
function max() {
	var x = arguments[0];
	var N = x.length;
	var xmax = x[0];
	for(var i = 1; i < N; i++) {
		if(x[i] > xmax) {
			xmax = x[i];
		}
	}
	return xmax;
}

// Get minimum value of an array
function min() {
	var x = arguments[0];
	var N = x.length;
	var xmin = x[0];
	for(var i = 1; i < N; i++) {
		if(x[i] < xmin) {
			xmin = x[i];
		}
	}
	return xmin;
}

// Display
function tout() {
	ta.value += arguments[0];
	ta.scrollTop = ta.scrollHeight;
}

// Create a textarea as output
function createOutput() {
	ta = document.createElement("textarea");
	ta.style.width = "400px";
	ta.style.height = "300px";
	ta.style.overflowY = "scroll";
	document.body.append(ta);
}
