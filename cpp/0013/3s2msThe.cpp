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
	double v_w1 = v0 / omega1;
	double v_w2 = v0 / omega2;
	double x2L5 = 2*x0 + 5*L;
	
	// Define parameters for case A
	double phi1A = atan((-L) / v_w1);
	double phi2A = M_PI / 2;	
	double A1A = 2 * sqrt((-L)*(-L) + v_w1*v_w1);
	double A2A = 2 * x2L5;
	
	// Define parameters for case B
	double phi1B = M_PI / 2;
	double phi2B = atan(x2L5 / v_w2);
	double A1B = 2*(-L);
	double A2B = 2 * sqrt(x2L5*x2L5 + v_w2*v_w2);
	
	// Define iteration parameters
	double tbeg = 0;
	double tend = 2 * max(T1, T2);
	double Nt = 100;
	double dt = (tend - tbeg) / Nt;
	double t = tbeg;
	
	// Verbose parameters
	cout << "# parameters" << endl;
	cout << "# omega1 " << omega1 << endl;
	cout << "# omega2 " << omega2 << endl;
	cout << "# T1 " << T1 << endl;
	cout << "# T2 " << T2 << endl;
	cout << "# A1A " << A1A << endl;
	cout << "# A2A " << A2A << endl;
	cout << "# A1B " << A1B << endl;
	cout << "# A2B " << A2B << endl;
	cout << endl;
	
	// Verbose time series of A1A, A2A, A1B, A2B
	cout << "# t\tx1A\tx2A\tx1B\tx2B" << endl;
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
			
		cout << t << "\t"; 
		cout << x1A << "\t"; 
		cout << x2A << "\t"; 
		cout << x1B << "\t"; 
		cout << x2B << endl; 
		
		t += dt;
	}
		
	// Terminate program
	return 0;
}
