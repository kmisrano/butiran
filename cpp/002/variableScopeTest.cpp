/*
	variableScopeTest.cpp
	Example 
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ variableScopeTest.cpp -o variableScopeTest
	Execute: ./variableScopeTest
	
	20181216
	Start this program.
*/

// Include libraries
#include <iostream>

// Use namespace
using namespace std;

// Define main function
int main(int argc, char *argv[]) {
	int i = 1;
	{ int i = 2; { i = 3; } i = i; }
	cout << i << endl;
	
	return 0;
}
