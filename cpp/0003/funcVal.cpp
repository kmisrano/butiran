/*
	funcVal.cpp
	Example of passing arguments by value to a function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ funcVal.cpp -o funcVal
	Execute: ./funcVal
	
	20181219
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int add(int, int);

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
int add(int a, int b) {
	int c = a + b;
	
	// Change only inside the function
	a = 100;
	b = 35;
	
	return c;
}
