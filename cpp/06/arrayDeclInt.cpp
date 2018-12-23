/*
	arrayDeclInt.cpp
	Example of declaration of array of int
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ arrayDeclInt.cpp -o arrayDeclInt
	Execute: ./arrayDeclInt
	
	20181223
	Start this program at home in Bogor.
*/

#include <iostream>

using namespace std;

void coutArray(int[], int);

int main(int argc, char *argv[]) {
	const int N1 = 4;
	int x1[N1] = {10, 1, 100, 3};
	cout << "x1: "; coutArray(x1, N1);
	
	const int N2 = 5;
	int x2[N2] = {10, 1, 9};
	cout << "x2: "; coutArray(x2, N2);
	
	const int N3 = 3;
	int x3[N3] = {};
	cout << "x3: "; coutArray(x3, N3);
	
	const int N4 = 4;
	int x4[N4];
	cout << "x4: "; coutArray(x4, N4);
	
	return 0;
}

// Display array of int in console
void coutArray(int x[], int N) {
	for(int i = 0; i < N; i++) {
		cout << x[i];
		if(i < N - 1) cout << " ";
	}
	cout << endl;
}
