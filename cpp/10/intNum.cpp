/*
	intNum.cpp
	Calculate numerical integration of a function
	using some rules
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ intNum.cpp -o intNum
	Execute: ./intNum
	
	20190104
	Start this program at campus in Bandung.
*/

#include <iostream>
#include <cstdlib>
#include <cstring>

double f(double);

using namespace std;

int main(int argc, char *argv[]) {
	// Check arguments
	if(argc < 5) {
		cout << "Usage: intTrap [xa xb N n]" << endl;
		cout << "xa\tinitial x" << endl;
		cout << "xb\tfinal x" << endl;
		cout << "N\tnumber of segment dx" << endl;
		cout << "n\tintegration rule" << endl;
		cout << "\t0 rectangle left point" << endl;
		cout << "\t1 rectangle mid point" << endl;
		cout << "\t2 rectangle right point" << endl;
		cout << "\t3 trapezium" << endl;
		cout << "\t4 Simpson" << endl;
		cout << "\t5 Simpson 3/8" << endl;
		cout << "\t6 Boole" << endl;
		return 1;
	}
	
	// Get all parameters
	double xa = atof(argv[1]);
	double xb = atof(argv[2]);
	int N = atoi(argv[3]);
	int n = atoi(argv[4]);
	
	// Get string information
	string strRule;
	double c[7];
	double beta;
	switch(n) {
	
	case 0:
		strRule = "Rectangular left point";
		c[0] = 1; c[1] = 0; c[2] = 0; c[3] = 0;
		c[4] = 0; c[5] = 0; c[6] = 0;
		beta = 1;
	break;
	
	case 1:
		strRule = "Rectangular mid point";
		c[0] = 0; c[1] = 0; c[2] = 0; c[3] = 1;
		c[4] = 0; c[5] = 0; c[6] = 0;
		beta = 1;
	break;
	
	case 2:
		strRule = "Rectangular right point";
		c[0] = 0; c[1] = 0; c[2] = 0; c[3] = 0;
		c[4] = 0; c[5] = 0; c[6] = 1;
		beta = 1;
	break;
	
	case 3:
		strRule = "Trapezium";
		c[0] = 1; c[1] = 0; c[2] = 0; c[3] = 0;
		c[4] = 0; c[5] = 0; c[6] = 1;
		beta = 2;
	break;
	
	case 4:
		strRule = "Simpson";
		c[0] = 1; c[1] = 0; c[2] = 0; c[3] = 4;
		c[4] = 0; c[5] = 0; c[6] = 1;
		beta = 6;
	break;
	
	case 5:
		strRule = "Simpson 3/8";
		c[0] = 1; c[1] = 0; c[2] = 3; c[3] = 0;
		c[4] = 3; c[5] = 0; c[6] = 1;
		beta = 8;
	break;
	
	case 6:
		strRule = "Boole";
		c[0] = 7; c[1] = 32; c[2] = 0; c[3] = 12;
		c[4] = 0; c[5] = 32; c[6] = 7;
		beta = 90;
	break;
	
	default:
		return -1;
	}
	
	// Calculate dx
	double dx = (xb - xa) / N;
	double x[7];
	
	// Calculate area
	double A = 0;
	for(int i = 1; i <= N; i++) {
		double xi = xa + i * dx;
		x[0] = xi - dx * 1;
		x[1] = xi - dx * 3 / 4;
		x[2] = xi - dx * 2 / 3;
		x[3] = xi - dx * 1 / 2;
		x[4] = xi - dx * 1 / 3;
		x[5] = xi - dx * 1 / 4;
		x[6] = xi - dx * 0;
		
		double Ai = 0;
		for(int j = 0; j < 7; j++) {
			Ai += (c[j] * f(x[j])) / beta;
		}
		
		A += Ai * dx;
	}
	cout << "Rule " << strRule << ", ";
	cout << "A = " << A << endl;
	
	// Terminate program
	return 0;
}

// Define quadratic function
double f(double x) {
	double fx = 1 + 2 * x + 3 * x * x;
	return fx;
}
