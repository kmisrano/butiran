/*
	iterCharNum1.cpp
	Example of nested iteration with for
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ iterCharNum1.cpp -o iterCharNum1
	Execute: ./iterCharNum1
	
	20181221
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	int mat[3][5] = {
		{1, 2, 3, 4, 5},
		{6, 7, 8, 9, 10},
		{11, 12, 13, 14, 15}
	};
	
	int MAT = sizeof(mat) / sizeof(int);
	int COL = sizeof(mat[0]) / sizeof(int);
	int ROW = MAT / COL;
	
	for(int r = 0; r < ROW; r++) {
		for(int c = 0; c < COL; c++) {
			cout << mat[r][c];
			if(c < COL - 1) cout << "\t";
		}
		cout << endl;
	}
		
	return 0;
}
