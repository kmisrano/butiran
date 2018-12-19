/*
	headerFile.cpp
	Example of using of header file
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ headerFile.cpp -o headerFile
	Execute: ./headerFile
	
	20181219
	Start this program.
*/

#include <iostream>
#include "incdec.h"

using namespace std;

int main(int argc, char *argv[]) {
	int j = 100;
	cout << "j = " << j << endl;
	
	inc(j);
	cout << "inc(j); j = " << j << endl;
	
	inc(j, 10);
	cout << "inc(j, 10); j = " << j << endl;
	
	dec(j, 11);
	cout << "dec(j, 11); j = " << j << endl;
	
	dec(j);
	cout << "dec(j); j = " << j << endl;
	
	return 0;
}
