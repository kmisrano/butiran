/*
	funcRef.cpp
	Example of passing arguments by reference to a function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ funcRef.cpp -o funcRef
	Execute: ./funcRef
	
	20181219
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int add(int&, int&);

int main(int argc, char *argv[]) {
	int x = 1;
	int y = 3;
	int z = add(x, y);
	
	cout << "x = " << x << endl;
	cout << "y = " << y << endl;
	cout << "z = add(" << x << ", " << y << ") = ";
	cout << z << endl;
	
	return 0;
}

// Add two numbers
int add(int &a, int &b) {
	int c = a + b;
	
	// Change inside the function but the arguments are
	// passed by reference, then this changes will affect
	// the passed variabel outside this function
	a = 100;
	b = 35;
	
	return c;
}
