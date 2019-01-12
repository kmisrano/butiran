/*
	odeVeloDrag.cpp
	Solve ordinary differential equation (ODE) for
	velocity due to drag force
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ odeVeloDrag.cpp -o odeVeloDrag
	Execute: ./odeVeloDrag
	
	20190112
	Start this program at home in Bandung.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	// Check arguments
	if(argc < 4) {
		cout << "Usage: odeVeloDrag [tbeg tend dt]" << endl;
		cout << "tbeg\tinitial t" << endl;
		cout << "tend\tfinal t" << endl;
		cout << "dt\tstep of t" << endl;
		return 1;
	}
	
	// Get all parameters
	double tbeg = atof(argv[1]);
	double tend = atof(argv[2]);
	double dt = atof(argv[3]);
	
	// Perform iteration
	double t = tbeg;
	while(t <= tend) {
		cout << t << endl;
		t += dt;
	}
	
	// Terminate program
	return 0;
}
