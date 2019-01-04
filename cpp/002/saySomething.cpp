/*
	saySomething.cpp
	Print some words to console
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ saySomething.cpp -o saySomething
	Execute: ./saySomething
	
	20181216
	Start this program.
*/

// Include library
#include <iostream>

// Use namespace
using namespace std;

// Declare function name
void saySomething(const char*);

// Define main function
int main(int argc, char *argv[]) {
	
	// Define a string from const cha
	const char *text = "Hello, World!";
	
	// Call a function with argument
	saySomething(text);
	
	// Return value, normally 0 means ok
	return 0;
}

// Define function content
void saySomething(const char* msg) {
	cout << msg << endl;
}
