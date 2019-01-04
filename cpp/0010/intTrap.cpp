/*
	intTrap.cpp
	Calculate numerical integration of a function
	using trapesium rule
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ intTrap.cpp -o intTrap
	Execute: ./intTrap
	
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
		cout << "Usage: intTrap [xa xb N]" << endl;
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
	double AT = 0;
	for(int i = 1; i <= N; i++) {
		double xi_1 = xa + (i - 1) * dx;
		double xi = xa + i * dx;
		AT += 0.5 * (f(xi_1) + f(xi)) * dx;
	}
	cout << "AT = " << AT << endl;
	
	// Terminate program
	return 0;
}

// Define quadratic function
double f(double x) {
	double fx = 1 + 2 * x + 3 * x * x;
	return fx;
}
