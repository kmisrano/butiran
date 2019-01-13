/*
	cinOut.cpp
	Example of program using console in and out
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ cinOut.cpp -o cinOut
	Execute: ./cinOut
	
	20190113
	1324 Start creating at home.
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	double p, l, t, V, m, rho;
	
	// Read length, width, height
	cout << "p = "; cin >> p;
	cout << "l = "; cin >> l;
	cout << "t = "; cin >> t;
	
	// Calculate volume
	V = p * l * t;
	cout << "V = " << V << endl;
	
	// Read mass
	cout << "m = "; cin >> m;
	
	// Calculate density
	rho = m / V;
	cout << "rho = " << rho << endl;
	
	// Terminate program
	return 0;
}
