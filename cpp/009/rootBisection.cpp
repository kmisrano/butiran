/*
	rootBisection.cpp
	Find first root of a quadratic equation using
	bisection algoritm
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ rootBisection.cpp -o rootBisection
	Execute: ./rootBisection
	
	20181230
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
		cout << "Usage: rootBisection [x1 x2 eps]" << endl;
		cout << "x1\t1st x" << endl;
		cout << "x2\t2nd x" << endl;
		cout << "eps\taccuracy of f(xn) = 0" << endl;
		return 1;
	}
	
	// Get all parameters
	double xa = atof(argv[1]);
	double xb = atof(argv[2]);;
	double eps = atof(argv[3]);
	
	
	int i = 0;
	cout << "# i\txc\tf(xc)" << endl;
	
	// Perform scanning process
	vector<double> root = {};
	double xc = (xa + xb) / 2;
	double fc = f(xc);
	while(fabs(fc) > eps) {
		double fa = f(xa);
		double fb = f(xb);
		if(fa * fb > 0) {
			break;
		}
		
		xc = (xb + xa) / 2;
		fc = f(xc);
		cout << ++i << "\t";
		cout << xc << "\t" << fc << endl;
		
		if(fabs(fc) < eps) {
			root.push_back(xc);
		}
				
		if(fa * fc <= 0) {
			swap(xb, xa);
		}
		xa = xb;
		xb = xc;		
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
