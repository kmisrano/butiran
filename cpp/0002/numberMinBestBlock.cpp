/*
	numberMinBestBlock.cpp
	Determine minimum of some numbers
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ numberMinBestBlock.cpp -o numberMinBestBlock
	Execute: ./numberMinBestBlock
	
	20181216
	Start this program.
*/

// Include libraries
#include <iostream>
#include <cmath>
#include <cstring>

// Use namespace
using namespace std;

// Define functions name
void getArrayFromArgumets(int, char*[], double[]);
double minValueFromArray(int, double[]);

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
	
	// Get array and find minimum value of it
	getArrayFromArgumets(N, argv, x);	
	double xmin = minValueFromArray(N, x);
	
	// Display information
	cout << "N = " << N << endl;
	cout << "x = [";
	for(int i = 0; i < N; i++) {
		cout << x[i];
		if(i < N - 1) cout << ", ";
	}
	cout << "]" << endl;
	cout << "xmin = " << xmin << endl;
	
	// Return success state
	return 0;
}

// Get array from program arguments
void getArrayFromArgumets(int N, char *argv[], double x[]) {
	for(int i = 0; i < N; i++) {
		x[i] = atof(argv[i + 1]);
	}	
}

// Find minimum of an array
double minValueFromArray(int N, double x[]) {
	double xmin = x[0];
	for(int i = 1; i < N; i++) {
		if(x[i] < xmin) {
			xmin = x[i];
		}
	}
	return xmin;
}
