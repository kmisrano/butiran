/*
	deriv2Func.cpp
	2nd derivative of a function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ deriv2Func.cpp -o deriv2Func
	Execute: ./deriv2Func
	
	20181227
	Start this program at Physics in Bandung.
*/

#include <cmath>
#include <iostream>
#include <sstream>
#include <cstring>
#include <vector>

double f(double);

using namespace std;

int main(int argc, char *argv[]) {
	// Define dx
	double dx = 1E-5;
	
	// Calculate 2nd derivative
	double x = 100;
	double fx = (f(x + dx) - 2 * f(x) + f(x - dx)) / (dx * dx);
	
	// Show results
	cout << "f(x) = 1 + x + x^2" << endl;
	cout << "dx = " << dx << endl;
	cout << "f'(" << x << ") = " << fx << endl;
	
	return 0;
}

// Function f(x) = c0 + c1 x + c2 x^2
double f(double x) {
	double c0 = 1;
	double c1 = 1;
	double c2 = 1;
	double y = c0 + c1 * x + c2 * x * x;
	return y;
}
