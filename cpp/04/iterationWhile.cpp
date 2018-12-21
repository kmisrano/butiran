/*
	iterationWhile.cpp
	Example of iteration with while
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ iterationWhile.cpp -o iterationWhile
	Execute: ./iterationWhile
	
	20181221
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

double f(double);

int main(int argc, char *argv[]) {
	double xbeg = 0;
	double xend = 1;
	double dx = 0.1;
	double x = xbeg;
	
	cout << "x\tf(x)" << endl;
	while(x <= xend) {
		double fx = f(x);
		cout << x << "\t";
		cout << fx << endl;
		x += dx;
	}
	
	return 0;
}

double f(double x) {
	//double fx = 1 + x + x * x + x * x * x; // 6 operation
	double fx = 1 + (1 + (1 + x) * x) * x; // 5 operation
	return fx;
}
