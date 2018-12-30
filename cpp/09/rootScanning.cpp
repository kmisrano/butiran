/*
	rootScanning.cpp
	Find first root of a quadratic equation using
	scanning algoritm
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ rootScanning.cpp -o rootScanning
	Execute: ./rootScanning
	
	20181230
	Start this program at home in Bandung.
*/

#include <iostream>
#include <cmath>
#include <vector>

double f(double);

using namespace std;

int main(int argc, char *argv[]) {
	// Check arguments
	if(argc < 5) {
		cout << "Usage: rootScanning [xbeg xend dx eps]" << endl;
		cout << "xbeg\tinitial x" << endl;
		cout << "xend\tfinal x" << endl;
		cout << "dx\tscanning step" << endl;
		cout << "eps\taccuracy of f(x) = 0" << endl;
		return 1;
	}
	
	// Get all parameters
	double xbeg = atof(argv[1]);
	double xend = atof(argv[2]);;
	double dx = atof(argv[3]);
	double eps = atof(argv[4]);
	
	// Perform scanning process
	vector<double> root = {};
	double x = xbeg;
	while(x <= xend) {
		
		if(fabs(f(x)) < eps) {
			root.push_back(x);
			break;
		}
		
		x += dx;
	}
	
	// Display result
	if(root.size() > 0) {
		cout << "1st root = " << root[0] << endl;
	} else {
		cout << "No root found with given parameters" << endl;
	}	
	
	// Terminate program
	return 0;
}

// Define quadratic function
double f(double x) {
	double fx = (1.25 - x) * (x - 6.25);
	return fx;
}
