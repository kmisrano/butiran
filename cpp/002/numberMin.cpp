/*
	numberMin.cpp
	Determine minimum of some numbers
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ numberMin.cpp -o numberMin
	Execute: ./numberMin
	
	20181216
	Start this program.
*/

// Include libraries
#include <iostream>
#include <cmath>
#include <cstring>

// Use namespace
using namespace std;

// Define main function
int main(int argc, char *argv[]) {
	// Check program argument
	if(argc < 2) {
		// Display program usage
		cout << "Usage: numberMin [number [number [..]]]";
		cout << endl;
		
		// Return unsuccess state
		return -1;
	}
	
	// Define number of arguments and a array
	int N = argc - 1;
	double x[N];
	cout << "N = " << N << endl;
	
	// Fill array from program arguments
	for(int i = 0; i < N; i++) {
		x[i] = atof(argv[i + 1]);
		cout << x[i] << endl;
	}
	
	// Find minimum
	double xmin = x[0];
	for(int i = 1; i < N; i++) {
		if(x[i] < xmin) {
			xmin = x[i];
		}
	}
	cout << "xmin = " << xmin << endl;
	
	// Return success state
	return 0;
}
