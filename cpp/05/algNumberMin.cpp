/*
	algNumberMin.cpp
	Implementation of algorithm for finding smallest number
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ algNumberMin.cpp -o algNumberMin
	Execute: ./algNumberMin
	
	20181222
	Start this program at home in Bogor.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	// Define numbers and size of array
	int x[] = {11, 8, 2, 5, 10, 1, 23, 17, 4};
	int N = sizeof(x) / sizeof(int);
	
	// Get minimum value of the numbers
	int xmin = x[0];
	for(int i = 1; i < N; i++) {
		if(x[i] < xmin) {
			xmin = x[i];
		}
	}
	
	// Display all numbers and the result
	for(int i = 0; i < N; i++) {
		cout << x[i];
		if(i < N - 1) {
			cout << " ";
		}
	}
	cout << endl;
	cout << "xmin = " << xmin << endl;
	
	return 0;
}
