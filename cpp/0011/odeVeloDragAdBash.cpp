/*
	odeVeloDragAdBash.cpp
	Solve ordinary differential equation (ODE) for velocity
	due to drag force with Adams-Bashforth method
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ odeVeloDragAdBash.cpp -o odeVeloDragAdBash
	Execute: ./odeVeloDragAdBash
	
	20190113
	Start this program at home in Bandung, with correct time
	stamp.
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

double f(double, double);

int main(int argc, char *argv[]) {
	// Check arguments
	if(argc < 5) {
		cout << "Usage: odeVeloMidP [tbeg tend dt Tdata]" << endl;
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
	
	// Set error of implicit process
	double eps = 1E-7;
	
	// Perform iteration
	cout << "# t\tv_num\tv_the" << endl;
	double t = tbeg;
	double vthe = v0 * exp(-(b/m)*t);
	double vnum_1 = v0;
	double vnum = v0;
	while(t <= tend) {
		
		if(idata == Ndata) {
			cout << t << "\t";
			cout << vnum << "\t";
			cout << vthe << endl;
			idata = 0;
		}
		
		t += dt;
		idata++;
		
		// Calculate theoretical function
		vthe = v0 * exp(-(b/m)*t);
		
		// Calculate numerical solution
		if(t == tbeg + dt) {
			// Perform Euler method since vnum_1 is unknown
			vnum = vnum + dt * f(t, vnum);
			vnum_1 = vnum;
		} else {
			// Perform Adams-Bashforth method
			double buf = vnum;
			vnum = vnum
				+ 1.5 * dt * f(t, vnum)
				- 0.5 * dt * f(t - dt, vnum_1);
			vnum_1 = buf;
		}
	}
	
	// Terminate program
	return 0;
}

double f(double x, double y) {
	double b = 1;
	double m = 1;
	return -(b/m) * y;
}
