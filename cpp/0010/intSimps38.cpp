/*
	intSimps38.cpp
	Calculate numerical integration of a function
	using Simpson 3/8 rule
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ intSimps38.cpp -o intSimps38
	Execute: ./intSimps38
	
	20190103
	Start this program at campus in Bandung.
*/

#include <iostream>
#include <cstdlib>

double f(double);

using namespace std;

int main(int argc, char *argv[]) {
	// Check arguments
	if(argc < 4) {
		cout << "Usage: intSimps38 [xa xb N]" << endl;
		cout << "xa\tinitial x" << endl;
		cout << "xb\tfinal x" << endl;
		cout << "N\tnumber of segment dx" << endl;
		return 1;
	}
	
	// Get all parameters
	double xa = atof(argv[1]);
	double xb = atof(argv[2]);
	double N = atoi(argv[3]);
	
	// Calculate dx
	double dx = (xb - xa) / N;
	
	// Calculate area
	double AS = 0;
	for(int i = 1; i <= N; i++) {
		double xi_1 = xa + (i - 1) * dx;
		double xi = xa + i * dx;
		double xi_13 = xi - dx / 3;
		double xi_23 = xi - 2 * dx / 3;
		double f1331 = (f(xi_1) + 3 * f(xi_13)
			+ 3 * f(xi_23) + f(xi));
		AS += (1.0/8) * f1331 * dx;
	}
	cout << "AS3/8 = " << AS << endl;
	
	// Terminate program
	return 0;
}

// Define quadratic function
double f(double x) {
	double fx = 1 + 2 * x + 3 * x * x;
	return fx;
}
