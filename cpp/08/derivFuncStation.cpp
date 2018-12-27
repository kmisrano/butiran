/*
	derivFuncStation.cpp
	Derivative of a function to get a stationary point
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ derivFuncStation.cpp -o derivFuncStation
	Execute: ./derivFuncStation
	
	20181227
	Start this program at Physics in Bandung.
*/

#include <iostream>
#include <cmath>

double f(double);

using namespace std;

int main(int argc, char *argv[]) {
	// Define dx and eps
	double dx = 1E-6;
	double eps = 1E-4;
	
	// Calculate derivative
	double xbeg = 0;
	double xend = 10;
	double x = xbeg;
	
	double x0 = x;
	while(x <= xend) {
		
		double fx = (f(x + dx) - f(x)) / dx;
		
		if(abs(fx) < eps) {
			x0 = x;
			break;
		}
		
		x += dx;
	}
	
	// Show results
	cout << "f(x) = 8 - 6x + x^2" << endl;
	cout << "dx = " << dx << endl;
	cout << "eps = " << eps << endl;
	cout << "f'(x0) = 0, di sekitar x0 = " << x0 << endl;
	
	return 0;
}

// Function f(x) = c0 + c1 x + c2 x^2
double f(double x) {
	double c0 = 8;
	double c1 = -6;
	double c2 = 1;
	double y = c0 + c1 * x + c2 * x * x;
	return y;
}
