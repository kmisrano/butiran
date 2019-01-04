/*
	boxVDnSFunc.cpp
	Calculate box volume, density, and state
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ boxVDnsFunc.cpp -o boxVDnSFunc
	Execute: ./boxVDnSFunc
	
	20181218
	Start this program.
*/

#include <iostream>
#include <cstring>

using namespace std;

double boxVolume(double, double, double);
double boxDensity(double, double);
double boxState(double, double);
string stateString(int);

int main(int argc, char *argv[]) {
	// Define box length, width, height, mass
	double l = 1.5; // cm
	double w = 2.0; // cm
	double h = 3.2; // cm
	double m = 4.8; // g
	
	// Calculate volume and density
	double V = boxVolume(l, w, h);
	double rhob = boxDensity(m, V);
	
	// Define fluid density
	double rhof = 0.99;     // kg/cm^3
	
	// Determine box state and its string representation
	int s = boxState(rhob, rhof);
	string sStr = stateString(s);
	
	// Display information and result
	cout << "l = " << l << " cm" << endl;
	cout << "w = " << w << " cm" << endl;
	cout << "h = " << h << " cm" << endl;
	cout << "V = " << V << " cm^3" << endl;
	cout << "m = " << m << " g" << endl;
	cout << "rho_b = " << rhob << " g/cm^3" << endl;
	cout << "rho_f = " << rhof << " g/cm^3" << endl;
	cout << "s = " << s << endl;
	cout << "box is " << sStr << " in fluid" << endl;
	
	return 0;
}

// Calculate box volume
double boxVolume(double l, double w, double h) {
	double V = l * w * h;
	return V;
}

// Calculate box density
double boxDensity(double m, double V) {
	double rho = m / V;
	return rho;
}

// Determine box state
double boxState(double rhob, double rhof) {
	double eps = 1E-5;
	int s;
	if(rhob < rhof - eps) {
		s = 1;
	} else if(rhob > rhof + eps) {
		s = -1;
	} else {
		s = 0;
	}
	return s;
}

// Get string representation of box state
string stateString(int s) {
	string states[3];
	states[0] = "sink";
	states[1] = "suspended";
	states[2] = "float";
	return states[s + 1];
}
