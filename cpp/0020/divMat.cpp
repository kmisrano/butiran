/*
	divMat.cpp
	Div a matrix in C++ using vector with function and
	also operator
	
	Sparisoma Viridi | dudung@gmail.com
	
	Compile: g++ divMat.cpp -o divMat
	Execute: ./divMat
	
	20190212
	1945 Continue from divMat.cpp file and see mat.cpp for
	all references.
	2005 Fin.
*/

#include <iostream>
#include <cmath>
#include <cstdlib>
#include <vector>

using namespace std;

void disp(vector<vector<int>>);
vector<vector<int>> divMat(vector<vector<int>>, int);
vector<vector<int>> operator/(vector<vector<int>>, int);


int main(int argc, char *argv[]) {
	
	// Declare a matrix and show it
	vector<vector<int>> A = {
		{10, 20, 30, 40},
		{12, 14, 16, 18},
		{60, 30, 88, 38},
	};
	cout << "A = " << endl;
	disp(A);
	
	// Add a blank line
	cout << endl;
	
	// Define a scalar
	int a = 2;
	cout << "a = " << a << endl;
	cout << endl;

	// Div a matrix with a scalar
	vector<vector<int>> B = A / a;
	cout << "B = A / a = " << endl;
	disp(B);
	
	// Add a blank line
	cout << endl;
		
	// Div a matrix with a scalar
	vector<vector<int>> C = divMat(A, a);
	cout << "C = divMat(A, a) = " << endl;
	disp(C);
	
	return 0;
}

// Div matrix with scalar using function
vector<vector<int>> divMat(vector<vector<int>> M, int m) {
	vector<vector<int>> O = M;
	for(int i = 0; i < M.size(); i++) {
		for(int j = 0; j < M[i].size(); j++) {
			O[i][j] = M[i][j] / m;
		}
	}
	return O;
}

// Div matrix with scalar using operator
vector<vector<int>> operator/(vector<vector<int>> M, int m) {
	vector<vector<int>> O = M;
	for(int i = 0; i < M.size(); i++) {
		for(int j = 0; j < M[i].size(); j++) {
			O[i][j] = M[i][j] / m;
		}
	}
	return O;
}

// Display matrix of C++ Vector without iterator
void disp(vector<vector<int>> M) {
	for(int i = 0; i < M.size(); i++) {
		for(int j = 0; j < M[i].size(); j++) {
			cout << M[i][j];
			if(j < M[i].size() - 1) {
				cout << " ";
			}
		}
		cout << endl;
	}	
}
