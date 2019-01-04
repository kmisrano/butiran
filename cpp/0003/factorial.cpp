/*
	factorial.cpp
	Calculate factorial
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ factorial.cpp -o factorial
	Execute: ./factorial
	
	20181218
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	// Verbose program usage
	if(argc < 2) {
		cout << "Usage: factorial [n]" << endl;
		return -1;
	}
	
	// Get n from program argument
	int n = atoi(argv[1]);
	
	// Calculate factorial of n
	long int fact = 1;
	for(int i = n; i > 0; i--) {
		fact *= i;
	}
	cout << n << "! = " << fact << endl;
	
	return 0;
}
