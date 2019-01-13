/*
	conOutStreamF.cpp
	Example of program using only console out which is
	directed to file, while input is defined in the program
	(static), to change it the program must be edited and
	recompiled
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ conOutStreamF.cpp -o conOutStreamF
	Execute: ./conOutStreamF > data-conOutStreamF.txt
	
	20190113
	1752 Start creating at home.
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	// Define constants
	double g = 10;
	
	// Define initial condition
	double x0 = 0;
	double y0 = 20;
	double v0x = 30;
	double v0y = 40;
	
	// Define iteration parameters
	double tbeg = 0;
	double tend = 10;
	double dt = 1;
	double t = tbeg;
	
	// Perform iteration
	cout << "# t\tvx\tvy\tx\ty" << endl;
	while(t <= tend) {
		
		// Calculate motion variables
		double vx = v0x;
		double vy = v0y - g * t;
		double x = x0 + v0x * t;
		double y = y0 + v0y * t - 0.5 * g * t * t;
		
		// Display values to console
		cout << t << "\t";
		cout << vx << "\t";
		cout << vy << "\t";
		cout << x << "\t";
		cout << y << endl;
		
		// Increase time t by dt
		t += dt;
	}
	
	// Terminate program
	return 0;
}
