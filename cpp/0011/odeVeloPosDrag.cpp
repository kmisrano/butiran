/*
	odeVeloPosDrag.cpp
	Solve ordinary differential equation (ODE) for velocity
	and position due to drag force using Euler method
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ odeVeloPosDrag.cpp -o odeVeloPosDrag
	Execute: ./odeVeloPosDrag
	
	20190112
	Start this program at home in Bandung.
	20190113
	Correct output mismatch with time t and modify odeVeloDrag.
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	// Check arguments
	if(argc < 5) {
		cout << "Usage: odeVeloPosDrag [tbeg tend dt Tdata]" << endl;
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
	double x0 = 2;
	double b = 1;
	double m = 1;
	
	// Set output data
	int Ndata = round(Tdata / dt);
	int idata = Ndata;
	
	// Perform iteration
	cout << "# t\tv\tx" << endl;
	double t = tbeg;
	double v = v0;
	double x = x0;
	while(t <= tend) {
		
		if(idata == Ndata) {
			cout << t << "\t";
			cout << v << "\t";
			cout << x << endl;
			idata = 0;
		}
		
		t += dt;
		idata++;
		
		x += v * dt;
		v *= (1 - (b/m) * dt);
	}
	
	// Terminate program
	return 0;
}
