/*
	noInCout.cpp
	Example of program using only console out, while input
	is defined in the program (static), to change it the
	program must be edited and recompiled
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ noInCout.cpp -o noInCout
	Execute: ./noInCout
	
	20190113
	1712 Start creating at home.
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	double p, l, t, V, m, rho;
	
	p = 1;
	l = 3;
	t = 9;
	m = 81;
	
	// Read length, width, height
	cout << "p = " << p << endl;
	cout << "l = " << l << endl;
	cout << "t = " << t << endl;
	
	// Calculate volume
	V = p * l * t;
	cout << "V = " << V << endl;
	
	// Read mass
	cout << "m = " << m << endl;
	
	// Calculate density
	rho = m / V;
	cout << "rho = " << rho << endl;
	
	// Terminate program
	return 0;
}
