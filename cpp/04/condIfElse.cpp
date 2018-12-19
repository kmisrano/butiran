/*
	condIfElse.cpp
	Example of condition using if else
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ condIfElse.cpp -o condIfElse
	Execute: ./condIfElse
	
	20181219
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	int i = -5;
	bool positive = (i > 0);
	if(positive) {
		cout << i << " is positive" << endl;
	} else {
		cout << i << " is not positive" << endl;
	}
	
	return 0;
}
