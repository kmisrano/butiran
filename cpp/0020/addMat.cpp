/*
	addMat.cpp
	Add matrices in C++ using vector
	
	Sparisoma Viridi | dudung@gmail.com
	
	Compile: g++ addMat.cpp -o addMat
	Execute: ./addMat
	
	20190211
	Create this program waehrend zuhause krank.
	1958 Continue from mat.cpp file and see it for all
	references.
*/

#include <iostream>
#include <cmath>
#include <cstdlib>
#include <vector>

using namespace std;

void cout(vector<vector<int>>);

int main(int argc, char *argv[]) {
	
	// Declare a matrix and show it
	vector<vector<int>> A = {
		{1, 2},
		{3, 4},
		{5, 6},
	};
	cout << "A = " << endl;
	cout(A);
	
	// Add a blank line
	cout << endl;
	
	return 0;
}

// Display matrix of C++ Vector without iterator
void cout(vector<vector<int>> M) {
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
