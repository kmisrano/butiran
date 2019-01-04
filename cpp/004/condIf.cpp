/*
	condIf.cpp
	Example of condition using if
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ condIf.cpp -o condIf
	Execute: ./condIf
	
	20181219
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	int i = 3;
	bool positive = (i > 0);
	if(positive) {
		cout << i << " is positive" << endl;
	}
	
	return 0;
}
