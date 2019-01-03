/*
	iterationFor.cpp
	Example of iteration with for
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ iterationFor.cpp -o iterationFor
	Execute: ./iterationFor
	
	20181220
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int U(int);

int main(int argc, char *argv[]) {
	int N = 10;
	
	cout << "n\tUn" << endl;
	for(int n = 0; n <= N; n++) {
		int Un = U(n);
		cout << n << "\t";
		cout << Un << endl;
	}
	
	return 0;
}

int U(int n) {
	int Un = 2 * n + 1;
	return Un;
}