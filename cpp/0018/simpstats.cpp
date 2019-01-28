/*
	simpstats.js
	Some simple statistics function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ simpstats.cpp -o simpstats
	Execute: ./simpstats
	
	20190128
	1953 Derive from simpstats.js at home.
	20190129
	0423 Finish manual conversion of cpp from js.
*/

#include <iostream>
#include <sstream>
#include <vector>
#include <cstring>
#include <cmath>

using namespace std;

// Declare functions
string strval(vector<double>);
double min(vector<double>);
double max(vector<double>);
double avg(vector<double>);
double stdev(vector<double>);
void sort(vector<double>&);
double med(vector<double>);
double mod(vector<double>);

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
	
	// Calculate standard deviation
	double sigma = stdev(x);
	cout << "sigma = " << sigma << endl;

	// Sort x
	sort(x);
	cout << "x (sorted) = " << strval(x) << endl;
	
	// Get median
	double xmed = med(x);
	cout << "xmed = " << xmed << endl;
	
	// Get mode
	double xmod = mod(x);
	cout << "xmod = " << xmod << endl;
	
	return 0;
}

// Get mode of an array
double mod(vector<double> x) {
	int N = x.size();
	sort(x);
	vector<double> y; // for frequency
	vector<double> z; // for value
	int j;
	for(int i = 0; i < N; i++) {
		if(i == 0) {
			y.push_back(1);
			j = 0;
			z.push_back(x[i]);
		} else {
			if(x[i] == x[i - 1]) {
				y[j]++;
			} else {
				y.push_back(1);
				j++;
				z.push_back(x[i]);
			}
		}
	}
	int imax = 0;
	for(int i = 1; i < y.size(); i++) {
		if(y[i] > y[imax]) {
			imax = i;
		} 
	}
	return z[imax];
}

// Get median value of an array
double med(vector<double> x) {
	int N = x.size();
	sort(x);
	double xmed;
	if((N / 2) == floor(N / 2)) {
		int i = N / 2 - 1;
		xmed = 0.5 * (x[i] + x[i + 1]);
	} else {
		int i = (N - 1) / 2;
		xmed = x[i];
	}
	return xmed;
}

// Sort using bubble sort
void sort(vector<double> &x) {
	int N = x.size();
	for(int i = 0; i < N; i++) {
		for(int j = i + 1; j < N; j++) {
			if(x[i] > x[j]) {
				double xbuf = x[i];
				x[i] = x[j];
				x[j] = xbuf;
			}
		}
	}
}

// Calculate standard deviation of array components
double stdev(vector<double> x) {
	int N = x.size();	
	double xavg = avg(x);
	double s2 = 0;
	for(int i = 0; i < N; i++) {
		double dx = (x[i] - xavg);
		s2 += dx*dx;
	}
	double xdev = sqrt(s2 / (N - 1));
	return xdev;
}

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