/*
	argOutStreamF.cpp
	Example of program using console out which is directed
	to file, while input is from program arguments
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ argOutStreamF.cpp -o argOutStreamF
	Execute: ./argOutStreamF > data-argOutStreamF.txt
	
	20190113
	1752 Start creating at home.
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	// Show usage
	const char *pname = "argOutStreamF";
	if(argc < 7) {
		cout << "Usage: " << pname;
		cout << " [x0 y0 v0x v0y tbeg tend dt]" << endl;
		cout << "x0\tinitial x" << endl;
		cout << "y0\tinitial y" << endl;
		cout << "v0x\tinitial vx" << endl;
		cout << "v0y\tinitial vy" << endl;
		cout << "tbeg\tinitial t" << endl;
		cout << "tend\tfinal t" << endl;
		cout << "dt\tstep of t" << endl;
		return 1;
	}
	
	// Define constants
	double g = 10;
	
	// Define initial condition
	double x0 = atof(argv[1]);
	double y0 = atof(argv[2]);
	double v0x = atof(argv[3]);
	double v0y = atof(argv[4]);
	
	// Define iteration parameters
	double tbeg = atof(argv[5]);
	double tend = atof(argv[6]);
	double dt = atof(argv[7]);
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
