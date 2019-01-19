/*
	3s2msThe.cpp
	3 spring-2 mass system theoretically
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ 3s2msThe.cpp -o 3s2msThe
	Execute: ./3s2ms
	
	20190119
	1858 Start creating at home.
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	// Define parameters
	double L = 0.1;
	double m = 1 / (4 * M_PI * M_PI);
	double k = 100;
	
	// Calculate parameters
	double omega1 = sqrt(3 * k / m);
	double omega2 = sqrt(k / m);
	double T1 = 2 * M_PI / omega1;
	double T2 = 2 * M_PI / omega2;
	double x0 = 0;
	double v0 = 0.2 * L * omega2;
	
	// Define general parameters
	double v_w = v0 / w1;
	double v_w2 = v_w * v_w;
	
	// Define parameters for case A
	double phi1A = atan(-L / (v0/omega1));
	double phi2A = M_PI;
	double v0w1L = (v0/omega1) / L;
	double v0w1L2 = v0w1L * v0w1L;
	double A1A = -4 * sqrt(1 + v0w1L2) * (x0 + 2*L);
	double sqrtLv0w1 = sqrt(L*L - (v0*v0)*(omega1*omega1));
	double A2A = (v0/omega2) * (A1A/sqrtLv0w1 - 2);
	
	// Define parameters for case B
	double phi1B = M_PI;
	double phi2B = atan((2*x0 + 5*L) / (v0/omega1));
	double aa1 = x0 + 3*L;
	double aa2 = 2*x0 + 5*L;
	double aa3 =  v0*omega1;
	double A1B = 0;
	double A2B = 4 * aa1 * aa2 / sqrt(aa2*aa2 + aa3*aa3);
	
	// Define iteration parameters
	double tbeg = 0;
	double tend = 2 * max(T1, T2);
	double Nt = 100;
	double dt = (tend - tbeg) / Nt;
	double t = tbeg;
	
	while(t <= tend) {
		// Calculate case A
		double x1A = 0.5 * A2A * sin(omega2 * t + phi2A)
			+ 0.5 * A1A * sin(omega1 * t + phi1A)
			- (x0 + 3L);
		double x2A = 0.5 * A2A * sin(omega2 * t + phi2A)
			- 0.5 * A1A * sin(omega1 * t + phi1A)
			- (x0 + 4L);
		
		// Calculate case B
		double x1B = 0.5 * A2B * sin(omega2 * t + phi2B)
			+ 0.5 * A1B * sin(omega1 * t + phi1B)
			- (x0 + 3L);
		double x2B = 0.5 * A2B * sin(omega2 * t + phi2B)
			- 0.5 * A1B * sin(omega1 * t + phi1B)
			- (x0 + 4L);
		
		t += dt;
	}
	
	cout << "omega1 " << omega1 << endl;
	cout << "omega2 " << omega2 << endl;
	cout << "T1 " << T1 << endl;
	cout << "T2 " << T2 << endl;
	
	// Terminate program
	return 0;
}
