/*
	intRect.cpp
	Calculate numerical integration of a function
	using rectangular method
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ intRect.cpp -o intRect
	Execute: ./intRect
	
	20190103
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
		cout << "Usage: intRect [xa xb N]" << endl;
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
	double AL = 0;
	double AC = 0;
	double AR = 0;
	for(int i = 1; i <= N; i++) {
		double xi_1 = xa + (i - 1) * dx;
		AL += f(xi_1) * dx;
		
		double xi = xa + i * dx;
		AR += f(xi) * dx;
		
		double xi_12 = (xi_1 + xi) / 2;
		AC += f(xi_12) * dx;
	}
	cout << "AL = " << AL << endl;
	cout << "AC = " << AC << endl;
	cout << "AR = " << AR << endl;
	
	// Terminate program
	return 0;
}

// Define quadratic function
double f(double x) {
	double fx = 1 + 2 * x + 3 * x * x;
	return fx;
}
