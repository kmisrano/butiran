/*
	factorialFunc.cpp
	Calculate factorial using function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ factorialFunc.cpp -o factorialFunc
	Execute: ./factorialFunc
	
	20181218
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

long int factorial(int);

int main(int argc, char *argv[]) {
	// Verbose program usage
	if(argc < 2) {
		cout << "Usage: factorialFunc [n]" << endl;
		return -1;
	}
	
	// Calculate factorial
	int n = atoi(argv[1]);
	cout << n << "! = " << factorial(n) << endl;
	
	return 0;
}

// Calculate factorial of n
long int factorial(int n) {
	long int fact = 1;
	for(int i = n; i > 0; i--) {
		fact *= i;
	}
	return fact;
}
