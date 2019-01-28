/*
	simpstats.js
	Some simple statistics function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ simpstats.cpp -o simpstats
	Execute: ./simpstats
	
	20190128
	1953 Derive from simpstats.js at home.	
*/

#include <iostream>
#include <sstream>
#include <vector>
#include <cstring>

using namespace std;

// Declare functions
string strval(vector<double>);
double min(vector<double>);
double max(vector<double>);
double avg(vector<double>);

// Define main function
int main(int argc, char *argv[]) {
	// Define data in array form
	vector<double> x = {2, 3, 5, 2, 9, 7, 2, 8, 2, 1};
	cout << "x = " << strval(x) << endl;
	
	// Get minimum
	double xmin = min(x);
	cout << "xmin = " << xmin << endl;
	
	// Get maximum
	double xmax = max(x);
	cout << "xmax = " << xmax << endl;
	
	// Calculate avarage
	double xavg = avg(x);
	cout << "xavg = " << xavg << endl;
	
	/*
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
	*/
	return 0;
}

/*
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

// Get minimum value of an array
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
*/
// Calculate average value of array components
double avg(vector<double> x) {
	int N = x.size();	
	double sx = 0;
	for(int i = 0; i < N; i++) {
		sx += x[i];
	}
	double xavg = sx / N;
	return xavg;
}


// Get maximum value of an array
double max(vector<double> x) {
	int N = x.size();	
	double xmax = x[0];
	for(int i = 1; i < N; i++) {
		if(x[i] > xmax) {
			xmax = x[i];
		}
	}
	return xmax;
}

// Get minimum value of an array
double min(vector<double> x) {
	int N = x.size();	
	double xmin = x[0];
	for(int i = 1; i < N; i++) {
		if(x[i] < xmin) {
			xmin = x[i];
		}
	}
	return xmin;
}

// String representation of an array
string strval(vector<double> x) {
	ostringstream sout;
	int N = x.size();
	for(int i = 0; i < N; i++) {
		sout << x[i];
		if(i < N - 1) {
			sout << ", ";
		}
	}
	return sout.str();
}