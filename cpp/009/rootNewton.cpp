/*
	rootNewton.cpp
	Find first root of a quadratic equation using
	Newton's or Newton-Raphson method
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ rootNewton.cpp -o rootNewton
	Execute: ./rootNewton
	
	20181230
	Start this program at home in Bandung.
*/

#include <iostream>
#include <cmath>
#include <vector>

double f(double);
double fx(double);

using namespace std;

int main(int argc, char *argv[]) {
	// Check arguments
	if(argc < 3) {
		cout << "Usage: rootNewton [x1 eps]" << endl;
		cout << "x1\t1st x" << endl;
		cout << "eps\taccuracy of f(xn) = 0" << endl;
		return 1;
	}
	
	// Get all parameters
	double xa = atof(argv[1]);
	double eps = atof(argv[2]);
	
	
	int i = 0;
	cout << "# i\txc\tf(xc)" << endl;
	
	// Perform scanning process
	vector<double> root = {};
	double fa = f(xa);
	while(fabs(fa) > eps) {
		fa = f(xa);
		cout << ++i << "\t";
		cout << xa << "\t" << fa << endl;
		
		if(fabs(fa) < eps) {
			root.push_back(xa);
		}
		
		xa = xa - f(xa) / fx(xa);		
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

// Define quadratic function
double fx(double x) {
	double fx = -1 * (x - 6.25) + (1.25 - x) * 1;
	return fx;
}
