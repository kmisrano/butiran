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
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	// Check arguments
	if(argc < 5) {
		cout << "Usage: odeVeloDrag [tbeg tend dt Tdata]" << endl;
		cout << "tbeg\tinitial t" << endl;
		cout << "tend\tfinal t" << endl;
		cout << "dt\tstep of t" << endl;
		cout << "Tdata\tperiod of output" << endl;
		return 1;
	}
	
	// Get all parameters
	double tbeg = atof(argv[1]);
	double tend = atof(argv[2]);
	double dt = atof(argv[3]);
	double Tdata = atof(argv[4]);
	
	// Set physical parameters
	double v0 = 1;
	double b = 1;
	double m = 1;
	
	// Set output data
	int Ndata = round(Tdata / dt);
	int idata = Ndata;
	
	// Perform iteration
	cout << "# t\tv_num\tv_the" << endl;
	double t = tbeg;
	double vthe = v0 * exp(-(b/m)*t);
	double vnum = v0;
	while(t <= tend) {
		
		if(idata == Ndata) {
			cout << t << "\t";
			cout << vnum << "\t";
			cout << vthe << endl;
			idata = 0;
		}
		
		vthe = v0 * exp(-(b/m)*t);
		vnum *= (1 - (b/m) * dt);
	
		t += dt;
		idata++;
	}
	
	// Terminate program
	return 0;
}
