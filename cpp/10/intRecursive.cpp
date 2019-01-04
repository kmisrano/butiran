/*
	intRecursive.cpp
	Calculate numerical integration of a function
	using recursive rule
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ intRecursive.cpp -o intRecursive
	Execute: ./intRecursive
	
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
		cout << "Usage: intRecursive [xa xb N M]" << endl;
		cout << "xa\tinitial x" << endl;
		cout << "xb\tfinal x" << endl;
		cout << "N\tnumber of segment dx" << endl;
		cout << "M\trecursive order >= 3" << endl;
		return 1;
	}
	
	// Get all parameters
	double xa = atof(argv[1]);
	double xb = atof(argv[2]);
	int N = atoi(argv[3]);
	int M = atoi(argv[4]);
	
	if(M < 3) {
		cout << "error: M < 3" << endl;
		return 2;
	}
	
	// Calculate dx
	double dx = (xb - xa) / N;
	
	// Calculate area
	double A[M + 1];
	A[0] = 0;
	double AA = 0;
	for(int i = 1; i <= N; i++) {
		double xi = xa + i * dx;
		double x1 = xi - 1.0 * dx;
		double x2 = xi - 0.5 * dx;
		double x3 = xi - 0.0 * dx;
		
		A[1] = f(x2) * dx / 1;
		A[2] = ( f(x1) + f(x3) ) * dx / 2;
		
		A[3] = (1.0 / 3) * A[3-1] + (2.0 / 3) * A[3-2];
		for(int j = 4; j <= M; j++) {
			A[j] = 0;
			double Sk = 0;
			for(int k = 1; k < M; k++) {
				Sk += k;
				A[j] += (1.0 * k) * A[j - k];
			}
			A[j] /= Sk;
		}
		AA += A[M];
	}
	cout << "A = " << AA << endl;
	
	// Terminate program
	return 0;
}

// Define quadratic function
double f(double x) {
	double fx = 1 + 2 * x + 3 * x * x;
	return fx;
}
