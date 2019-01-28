/*
	simpstats.js
	Some simple statistics function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Use in HTML file:
	<script src="simpstats.js"></script>
	
	20190128
	1729 Start at home.
	20190129
	0404 Fix comment of stdev.
	
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
	var x = [2, 3, 5, 2, 9, 7, 2, 8, 2, 1];
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
	
	// Sort x
	sort(x);
	tout("x (sorted) = " + x.toString().replace(/,/g, ', ')
		+ "\n");
	
	// Get median
	var xmed = med(x);
	tout("xmed = " + xmed + "\n");
	
	// Get mode
	var xmod = mod(x);
	tout("xmod = " + xmod + "\n");
}

// Get mode of an array
function mod() {
	var x = arguments[0];
	var N = x.length;
	sort(x);
	var y = []; // for frequency
	var z = []; // for value
	var j;
	for(var i = 0; i < N; i++) {
		if(i == 0) {
			y.push(1);
			j = 0;
			z.push(x[i]);
		} else {
			if(x[i] == x[i - 1]) {
				y[j]++;
			} else {
				y.push(1);
				j++;
				z.push(x[i]);
			}
		}
	}
	var imax = 0;
	for(var i = 1; i < y.length; i++) {
		if(y[i] > y[imax]) {
			imax = i;
		} 
	}
	return z[imax];
}

// Get median of an array
function med() {
	var x = arguments[0];
	var N = x.length;
	sort(x);
	var xmed;
	if((N / 2) == Math.floor(N / 2)) {
		var i = N / 2 - 1;
		xmed = 0.5 * (x[i] + x[i + 1]);
	} else {
		var i = (N - 1) / 2;
		xmed = x[i];
	}
	return xmed;
}

// Sort using bubble sort
function sort() {
	var x = arguments[0];
	var N = x.length;
	for(var i = 0; i < N; i++) {
		for(var j = i + 1; j < N; j++) {
			if(x[i] > x[j]) {
				var xbuf = x[i];
				x[i] = x[j];
				x[j] = xbuf;
			}
		}
	}
}

// Calculate standard deviation of array components
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
	ta.style.width = "350px";
	ta.style.height = "150px";
	ta.style.overflowY = "scroll";
	document.body.append(ta);
}
