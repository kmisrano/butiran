/*
	boxVDnS.cpp
	Calculate box volume, density, and state
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ boxVDnS.cpp -o boxVDnS
	Execute: ./boxVDnS
	
	20181218
	Start this program.
*/

#include <iostream>
#include <cstring>

using namespace std;

int main(int argc, char *argv[]) {
	// Define box length, width, height, mass
	double l = 1.5; // cm
	double w = 2.0; // cm
	double h = 3.2; // cm
	double m = 4.8; // g
	
	// Calculate volume and density
	double V = l * w * h;  // cm^3
	double rhob = m / V;   // kg / cm^3
	
	// Define fluid density
	double rhof = 0.5;     // kg / cm^3
	
	// Determine box state
	double eps = 1E-5; // 0
	int s;
	if(rhob < rhof - eps) {
		s = 1;
	} else if(rhob > rhof + eps) {
		s = -1;
	} else {
		s = 0;
	}
	
	// Define state in string representation
	string states[3];
	states[0] = "sink";
	states[1] = "suspended";
	states[2] = "float";
	
	// Display information and result
	cout << "l = " << l << " cm" << endl;
	cout << "w = " << w << " cm" << endl;
	cout << "h = " << h << " cm" << endl;
	cout << "V = " << V << " cm^3" << endl;
	cout << "m = " << m << " g" << endl;
	cout << "rho_b = " << rhob << " g/cm^3" << endl;
	cout << "rho_f = " << rhof << " g/cm^3" << endl;
	cout << "s = " << s << endl;
	cout << "box is " << states[s + 1] << " in fluid" << endl;
	
	return 0;
}
