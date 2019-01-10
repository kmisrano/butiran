/*
	hotWireNum.cpp
	Simulate simple hot wire system interacting with
	environment using Euler method
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ hotWireNum.cpp -o hotWireNum
	Execute: ./hotWireNum
	
	20190110
	Start this program at campus in Bandung.
*/

#include <iostream>
#include <cmath>

double f(double);

using namespace std;

int main(int argc, char *argv[]) {
	
	// Constants
	double sigma = 5.6703E-8; // W/m2.K4
	
	// Material properties
	double epsilon = 0.04; //
	double c = 385; // J/kg.K
	double rho = 1.68E-8; // \Omega.m
	double rho_m = 8.9E3; // kg/m3

	// Wire parameters
	double lambda = 80E-3; // m\Omega/m
	double D = 0.511E-3; // m
	double L = 1; // m
	
	// Environment
	double TE = 298; // K
	
	// Input
	double V = 9; // V
	
	// Calculated parameters
	double R = lambda * L;
	double AL = M_PI * D * L;
	double AD = 0.25 * M_PI * D * D;
	double Vol = L * AD;
	double m = rho_m * Vol;
	double kt4 = (2 * L * sigma * epsilon * sqrt(M_PI * AD)) / (m * c);
	
	// Analytical prediction
	double TE4 = TE * TE * TE * TE;
	double dT4 = (V * V * AD) / (rho * L * kt4 * m * c); 
	double Tinf4 = TE4 + dT4;
	double Tinf2 = sqrt(Tinf4);
	double Tinf = sqrt(Tinf2);
	
	// Initial value
	double T0 = TE;
	
	// Verbose values
	cout << "R\t" << R << endl;
	cout << "R\t" << (rho * L / AD) << endl;
	cout << "AL\t" << AL << endl;
	cout << "AD\t" << AD << endl;
	cout << "m\t" << m << endl;
	cout << "kt4\t" << kt4 << endl;
	cout << "TE\t" << TE << endl;
	cout << "T0\t" << T0 << endl;
	cout << "dT4\t" << dT4 << endl;
	cout << "Tinf\t" << Tinf << endl;
	
	return 0;
}
