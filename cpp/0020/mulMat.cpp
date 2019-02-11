/*
	MulMat.cpp
	Multiply matrices in C++ using vector with function and
	also operator
	
	Sparisoma Viridi | dudung@gmail.com
	
	Compile: g++ mulMat.cpp -o mulMat
	Execute: ./mulMat
	
	20190211
	Create this program waehrend zuhause krank.
	2045 Continue from subMat.cpp file and see mat.cpp for
	all references.
	2050 !ok, save it for morgen oder uebermorgen.
*/

#include <iostream>
#include <cmath>
#include <cstdlib>
#include <vector>

using namespace std;

void disp(vector<vector<int>>);
vector<vector<int>> mulMat(
	vector<vector<int>>,
	vector<vector<int>>
);
vector<vector<int>> operator*(
	vector<vector<int>>,
	vector<vector<int>>
);

int main(int argc, char *argv[]) {
	
	// Declare a matrix and show it
	vector<vector<int>> A = {
		{1, 2, 3},
		{1, 1, 1},
		{0, 0, 1},
	};
	cout << "A = " << endl;
	disp(A);
	
	// Add a blank line
	cout << endl;
	
	// Declare another matrix and show it
	vector<vector<int>> B = {
		{1, 1},
		{1, 0},
		{1, -1},
	};
	cout << "B = " << endl;
	disp(B);
	
	// Add a blank line
	cout << endl;
	
	// Multiply two previous matrix and show the result
	vector<vector<int>> C = mulMat(A, B);
	cout << "C = A * B = " << endl;
	disp(C);
	
	return 0;
}

// Sub two matrices using operator
vector<vector<int>> operator*(
	vector<vector<int>> M,
	vector<vector<int>> N
) {
	vector<vector<int>> O = M;
	for(int i = 0; i < M.size(); i++) {
		for(int j = 0; j < M[i].size(); j++) {
			O[i][j] = M[i][j] - N[i][j];
		}	
	}
	return O;
}

// Sub two matrices using function
vector<vector<int>> mulMat(
	vector<vector<int>> M,
	vector<vector<int>> N
) {
	vector<vector<int>> O = M;
	for(int i = 0; i < M.size(); i++) {
		for(int j = 0; j < M[i].size(); j++) {
			O[i][j] = M[i][j] - N[i][j];
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
