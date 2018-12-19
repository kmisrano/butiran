/*
	funcOverloading.cpp
	Example of function overloading
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ funcOverloading.cpp -o funcOverloading
	Execute: ./funcOverloading
	
	20181219
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

// Define functions with different number of arguments
void inc(int&);
void inc(int&, int);

int main(int argc, char *argv[]) {
	int i = 1;
	cout << "i = " << i << endl;
	
	i++;
	cout << "i++; i = " << i << endl;
	
	i = i + 1;
	cout << "i = i + 1; i = " << i << endl;
	
	i += 1;
	cout << "i += 1; i = " << i << endl;
	
	inc(i);
	cout << "inc(i); i = " << i << endl;
	
	inc(i, 1);
	cout << "inc(i, 1); i = " << i << endl;
	
	inc(i, 3);
	cout << "inc(i, 3); i = " << i << endl;
	
	return 0;
}

// Increase by 1
void inc(int &i) {
	i++;
}

// Increase by n
void inc(int &i, int n) {
	i += n;
}
