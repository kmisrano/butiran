/*
	mat.cpp
	Matrix in C++ using vector
	
	Sparisoma Viridi | dudung@gmail.com
	
	Compile: g++ mat.cpp -o mat
	Execute: ./mat [option]
	
	20190211
	Create this program waehrend zuhause krank.
*/

#include <iostream>
#include <cmath>
#include <cstdlib>
#include <vector>

using namespace std;

int main(int argc, char *argv[]) {
	
	vector<vector<int>> M = {
		{1, 2},
		{3, 4, 8, 9},
		{5, 6},
	};
	
	for(int i = 0; i < M.size(); i++) {
		for(int j = 0; j < M[i].size(); j++) {
			cout << M[i][j] << " ";
		}
		cout << endl;
	}
	
	
	vector<int> J = {9, 8, 7};
	for(int i: J) {
		cout << i << endl;
	}
	
	return 0;
}
