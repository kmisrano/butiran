/*
	ssmsThe.cpp
	Single spring-mass system from theoretical solution
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ ssmsThe.cpp -o ssmsThe.
	Execute: ./ssmsThe
	
	20190115
	0809 Start creating at home.
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	// Verbose usage
	const char *pname = "ssmsThe";
	if(argc < 7) {
		cout << "Usage: " << pname << " [m k xo x0 v0 gamma]";
		cout << endl;
		cout << "m\tmass" << endl;
		cout << "k\tspring constant" << endl;
		cout << "xo\torigin of x" << endl;
		cout << "x0\tinitial x" << endl;
		cout << "v0\tinitial v" << endl;
		cout << "gamma\tdown scale factor of A^2" << endl;
		return 1;
	}
	
	// Set physical properties
	double m = atof(argv[1]); // 1
	double k = atof(argv[2]); // 4 * M_PI * M_PI * 100;
	
	// Set origin
	double xo = atof(argv[3]); // 0
	
	// Set initial condition
	double x0 = atof(argv[4]); // xo
	double v0 = atof(argv[5]); // 1
	
	// Calculate omega0 and T0
	double omega0 = sqrt(k / m);
	double T0 = 2 * M_PI / omega0;
	
	// Set A
	double gamma = atof(argv[6]); // 0.39489
	double AA = (x0 - xo)*(x0 - xo) + (v0 / omega0)*(v0 / omega0);
	double A = sqrt(gamma * AA);
	
	// Calculate B
	double B = sqrt(AA - A * A);
	
	// Calculate phi0
	double AL = omega0 * (x0 - xo);
	double AR = v0 * B;
	double phi0 = atan( (AL - AR)/(AL + AR) );
	
	cout << "m = " << m << endl;
	cout << "k = " << k << endl;
	cout << "omega0 = " << omega0 << endl;
	cout << "T0 = " << T0 << endl;
	cout << "gamma = " << gamma << endl;
	cout << "A = " << A << endl;
	cout << "B = " << B << endl;
	cout << "phi0 = " << phi0 << endl;
	
	// Terminate program
	return 0;
}
