/*
	rootsClear.cpp
	Calculate roots with clear variable name
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ rootsClear.cpp -o rootsClear
	Execute: ./rootsClear
	
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
	double a = 2;
	double b = 13;
	double c = 15;
	
	// Calculate D
	double D = b * b - 4 * a * c;
	double sqrtD = sqrt(D);
	
	// Calculate roots
	double x1 = (-b + sqrtD) / (2 * a);
	double x2 = (-b - sqrtD) / (2 * a);
	
	// Show results
	cout << "y = " << a << "x^2 + ";
	cout << b << "x + ";
	cout << c << endl;
	cout << "x1 = " << x1 << endl;
	cout << "x2 = " << x2 << endl;
	
	// Return value, normally 0 means ok
	return 0;
}
