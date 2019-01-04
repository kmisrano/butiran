/*
	rootSecant.cpp
	Find first root of a quadratic equation using
	secant method
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ rootSecant.cpp -o rootSecant
	Execute: ./rootSecant
	
	20181231
	Start this program at home in Bandung.
*/

#include <iostream>
#include <cmath>
#include <vector>

double f(double);

using namespace std;

int main(int argc, char *argv[]) {
	// Check arguments
	if(argc < 4) {
		cout << "Usage: rootSecant [x1 x2 eps]" << endl;
		cout << "x1\t1st x" << endl;
		cout << "x2\t2nd x" << endl;
		cout << "eps\taccuracy of f(xn) = 0" << endl;
		return 1;
	}
	
	// Get all parameters
	double xa = atof(argv[1]);
	double xb = atof(argv[2]);
	double eps = atof(argv[3]);
	
	
	int i = 0;
	cout << "# i\txc\tf(xc)" << endl;
	
	// Perform scanning process
	vector<double> root = {};
	double fa = f(xa);
	double fb = f(xb);
	double xc = xb - (xb - xa) * fb / (fb - fa);
	double fc = f(xc);
	while(fabs(fc) > eps) {
		fc = f(xc);
		cout << ++i << "\t";
		cout << xc << "\t" << fc << endl;
		
		if(fabs(fc) < eps) {
			root.push_back(xc);
		}
		
		xa = xb;
		xb = xc;
		
		fa = f(xa);
		fb = f(xb);
		xc = xb - (xb - xa) * fb / (fb - fa);
	}
	
	// Display result
	if(root.size() > 0) {
		cout << "1st root = " << root[0] << endl;
	} else {
		cout << "No root found with given parameters" << endl;
	}	
	
	// Terminate program
	return 0;
}

// Define quadratic function
double f(double x) {
	double fx = (1.25 - x) * (x - 6.25);
	return fx;
}
