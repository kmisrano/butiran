/*
	derivFunc.cpp
	Derivative of a function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ derivFunc.cpp -o derivFunc
	Execute: ./derivFunc
	
	20181226
	Start this program at Gambar station in Jakarta.
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
	
	double x = 2;
	double fx = (f(x + dx) - f(x)) / dx;
	
	cout << "f(x) = 1 + x + x^2" << endl;
	cout << "dx = " << dx << endl;
	cout << "f'(2) = " << fx << endl;
	
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
