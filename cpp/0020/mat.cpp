/*
	mat.cpp
	Matrix in C++ using vector
	
	Sparisoma Viridi | dudung@gmail.com
	
	Compile: g++ mat.cpp -o mat
	Execute: ./mat [option]
	
	20190211
	Create this program waehrend zuhause krank.
	
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

void disp0(vector<vector<int>>);
void disp1(vector<vector<int>>);

int main(int argc, char *argv[]) {
	
	vector<vector<int>> N = {
		{1, 2},
		{3, 4, 8, 9},
		{5, 6},
	};
	
	disp0(N);
	disp1(N);
	
	return 0;
}

// Display matrix of C++ Vector without iterator
void disp0(vector<vector<int>> M) {
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
void disp1(vector<vector<int>> M) {
	for(vector<int> rows: M) {
		for(int val: rows) {
			cout << val;
			if(val < rows.end) {
				cout << " ";
			}
		}
		cout << endl;
	}
}
