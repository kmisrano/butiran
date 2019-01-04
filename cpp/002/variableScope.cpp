/*
	variableScope.cpp
	Example 
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ variableScope.cpp -o variableScope
	Execute: ./variableScope
	
	20181216
	Start this program.
*/

// Include libraries
#include <iostream>

// Use namespace
using namespace std;

// Define main function
int main(int argc, char *argv[]) {
	// In 1st block
	int i = 1;
	cout << i << endl;
	
	{
		// Enter 2nd block
		int i = 2;
		cout << i << endl;
		
		// Change value
		i = 17;
		cout << i << endl;
	}
	
	// Return to 1st block
	cout << i << endl;
	
	{
		// Enter 2nd block without defining i
		cout << i << endl;
		
		// Change value
		i = 3;
		cout << i << endl;
	}
	
	// Return to 1st block
	cout << i << endl;
	
	// Return success state
	return 0;
}
