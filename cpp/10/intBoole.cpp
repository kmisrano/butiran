/*
	intBoole.cpp
	Calculate numerical integration of a function
	using Simpson 3/8 rule
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ intBoole.cpp -o intBoole
	Execute: ./intBoole
	
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
		cout << "Usage: intBoole [xa xb N]" << endl;
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
	double AB = 0;
	for(int i = 1; i <= N; i++) {
		double xi = xa + i * dx;
		double f1 = 7 * f(xi - 1.00 * dx);
		double f2 = 32 * f(xi - 0.75 * dx);
		double f3 = 12 * f(xi - 0.50 * dx);
		double f4 = 32 * f(xi - 0.25 * dx);
		double f5 = 7 * f(xi - 0.00 * dx);
		AB += (1.0/90) * (f1 + f2 + f3 + f4 + f5) * dx;
	}
	cout << "AB = " << AB << endl;
	
	// Terminate program
	return 0;
}

// Define quadratic function
double f(double x) {
	double fx = 1 + 2 * x + 3 * x * x;
	return fx;
}
