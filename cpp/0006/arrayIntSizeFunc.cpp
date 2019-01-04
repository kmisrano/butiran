/*
	arrayIntSizeFunc.cpp
	Access array out of size
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ arrayIntSizeFunc.cpp -o arrayIntSizeFunc
	Execute: ./arrayIntSizeFunc
	
	20181223
	Start this program at home in Bogor.
*/

#include <iostream>

using namespace std;

int sizeOfArrayInt(int*);

int main(int argc, char *argv[]) {
	const int N = 6;
	int x[N] = {2, 3, 5, 7, 11, 13};
	
	int size1 = sizeof(x) / sizeof(int);
	int size2 = sizeOfArrayInt(x);
	
	cout << "size of x (direct) is " << size1 << endl;
	cout << "size of x (function) is " << size2 << endl;
	return 0;
}

int sizeOfArrayInt(int *x) {
	int s = sizeof(x) / sizeof(int);
	return s;
}
