/*
	funcInFunc.cpp
	Function declaration inside a function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ funcInFunc.cpp -o funcInFunc
	Execute: ./funcInFunc
	
	20181218
	Start this program.
*/

#include <iostream>
#include <cstring>

using namespace std;

string stateString(int);

string boxState(double, double, double, double, double);

int main(int argc, char *argv[]) {
	// Define all parameters
	double l = 1.5;
	double w = 2.0;
	double h = 3.2;
	double m = 4.8;
	double rhof = 0.99;
	
	// Get state of the box in fluid
	string state = boxState(l, w, h, m, rhof);
	
	// It will introduce error
	//double V = boxVolume(l, w, h);
	
	// Display information and result
	cout << "l = " << l << " cm" << endl;
	cout << "w = " << w << " cm" << endl;
	cout << "h = " << h << " cm" << endl;
	cout << "rho_f = " << rhof << " g/cm^3" << endl;
	cout << "box is " << state << " in fluid" << endl;
	
	return 0;
}

string boxState(
	double l, double w, double h,
	double m,
	double rhof) {
	
	// Define functions inside boxState
	double boxVolume(double, double, double);
	double boxDensity(double, double);
	double boxState(double, double);
	
	// Calculate volume and density
	double V = boxVolume(l, w, h);
	double rhob = boxDensity(m, V);
	
	// Determine box state and its string representation
	int s = boxState(rhob, rhof);
	string state = stateString(s);
	
	return state;
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
