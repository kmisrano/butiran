/*
	derivFuncStationInf.cpp
	Derivative of a function to get a inflection point as
	one of the stationary points
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ derivFuncStationInf.cpp -o derivFuncStationInf
	Execute: ./derivFuncStationInf
	
	20181227
	Start this program at Physics in Bandung.
*/

#include <iostream>
#include <cmath>

double f(double);
double fx(double, double);
double fxx(double, double);

using namespace std;

int main(int argc, char *argv[]) {
	// Define dx and eps
	double dx = 1E-6;
	double eps = 1E-3;
	
	// Calculate derivative
	double xbeg = 1.8;
	double xend = 2.2;
	double x = xbeg;
	
	double x0 = x;
	while(x <= xend) {
		
		if(abs(fxx(x, dx)) < eps) {
			x0 = x;
			break;
		}
		
		x += dx;
	}
		
	// Show results
	cout << "Function and parameters" << endl;
	cout << "f(x) = (x - 2)^3 + 5" << endl;
	cout << "dx = " << dx << endl;
	cout << "eps = " << eps << endl;
	cout << endl;
	
	// Numerical solution
	cout << "Numerical solution" << endl;
	cout << "x0 = " << x0 << endl;
	cout << "f(" << x0 << ") = " << f(x0) << endl;
	cout << "f'(" << x0 << ") = " << fx(x0, dx) << endl;
	cout << "f''(" << x0 << ") = " << fxx(x0, dx) << endl;
	cout << "x0 merupakan titik ";
	if(fxx(x0, dx) > 0) {
		cout << "minimum";
	} else if(fxx(x0, dx) < 0) {
		cout << "maksimum";
	} else if(abs(fxx(x0, dx)) < eps) {
		cout << "belok";
	}
	cout << endl;
	cout << endl;
	
	// Theoretical
	cout << "Theoretical solution" << endl;
	double x1 = 2;
	cout << "x1" << " = " << x1 << endl;
	cout << "f(" << x1 << ") = " << f(x1) << endl;
	cout << "f'(" << x1 << ") = " << fx(x1, dx) << endl;
	cout << "f''(" << x1 << ") = " << fxx(x1, dx) << endl;
	
	return 0;
}

double f(double x) {
	double y = (x - 2) * (x - 2) * (x - 2) + 5;
	return y;
}

double fx(double x, double dx) {
	double y = (f(x + dx) - f(x)) / (dx);
	return y;
}

double fxx(double x, double dx) {
	double y = (f(x + dx) - 2 * f(x) + f(x + dx)) / (dx * dx);
	return y;
}
