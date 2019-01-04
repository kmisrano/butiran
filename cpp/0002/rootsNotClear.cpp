/*
	rootsNotClear.cpp
	Calculate roots with not clear variable name
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ rootsNotClear.cpp -o rootsNotClear
	Execute: ./rootsNotClear
	
	20181216
	Start this program.
*/

// Include libraries
#include <iostream>
#include <cmath>

// Use namespace
using namespace std;

// Define main function
int main(int argc, char *argv[]) {
	// Define coefficient of quadratic equation
	double c1 = 2;
	double c2 = 13;
	double c3 = 15;
	
	// Calculate D
	double c4 = c2 * c2 - 4 * c1 * c3;
	double sqrtD = sqrt(c4);
	
	// Calculate roots
	double c5 = (-c2 + sqrtD) / (2 * c1);
	double c6 = (-c2 - sqrtD) / (2 * c1);
	
	// Show results
	cout << "y = " << c1 << "x^2 + ";
	cout << c2 << "x + ";
	cout << c3 << endl;
	cout << "x1 = " << c5 << endl;
	cout << "x2 = " << c6 << endl;
	
	// Return value, normally 0 means ok
	return 0;
}
