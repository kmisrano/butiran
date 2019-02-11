/*
	mat.cpp
	Matrix in C++ using vector
	
	Sparisoma Viridi | dudung@gmail.com
	
	Compile: g++ mat.cpp -o mat
	Execute: ./mat [option]
	
	20190211
	Create this program waehrend zuhause krank.
	1944 Considered it finished but still not understand how
	to get implicit iterator in for(auto xx: <vector>).
	
	References
	1 Iterate through a C++ Vector
	url https://stackoverflow.com/a/12702744/9475509
	2 Initialize a two dimensional C++ Vector
	url https://stackoverflow.com/q/17663186/9475509
	3 Iterate through a two dimensional C++ Vector
	url https://stackoverflow.com/a/23303597/9475509
*/

#include <iostream>
#include <cmath>
#include <cstdlib>
#include <vector>

using namespace std;

void dispMat0(vector<vector<int>>);
void dispMat1(vector<vector<int>>);

int main(int argc, char *argv[]) {
	
	// Declare a matrix and show it
	vector<vector<int>> A = {
		{1, 2},
		{3, 4},
		{5, 6},
	};
	cout << "A = " << endl;
	dispMat0(A);
	
	// Add a blank line
	
	// Declare another matrix and show it
	vector<vector<int>> B = {
		{1, 2, -1},
		{3, 4, -2},
		{5, 6, -3},
		{0, 0, -4},
	};
	cout << "B = " << endl;
	dispMat1(B);
	
	return 0;
}

// Display matrix of C++ Vector without iterator
void dispMat0(vector<vector<int>> M) {
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

// Display matrix of C++ Vector using iterator
void dispMat1(vector<vector<int>> M) {
	for(vector<int> rows: M) {
		auto it = rows.begin();
		for(int val: rows) {
			cout << val;
			it++;
			if(it < rows.end()) {
				cout << " ";
			}
		}
		cout << endl;
	}
}
