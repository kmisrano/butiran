/*
	factorialFuncRec.cpp
	Calculate factorial using function recursively
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ factorialFuncRec.cpp -o factorialFuncRec
	Execute: ./factorialFuncRec
	
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
		cout << "Usage: factorialFuncRec [n]" << endl;
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
	if(n > 0) {
		fact *= n * factorial(n - 1);
	}
	return fact;
}
