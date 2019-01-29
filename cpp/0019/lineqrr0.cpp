/*
	lineqrr0.cpp
	Solving linear equations using row reduction
	
	Sparisoma Viridi | dudung@gmail.com
	
	Compile: g++ lineqrr0.cpp -o lineqrr0
	Execute: ./lineqrr0 [option]
	
	20160301
	Create this program.
	In Cywin atoi requires cstdlib library but not fog g++
	in Kubuntu distro.
*/

#include <iostream>
#include <cmath>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	// Define program name
	const char *pname = "lineqrr0";
	
	// Verbose usage
	if(argc < 2) {
		cout << "Usage: " << pname << " ";
		cout << "[vop]" << endl;
		cout << "vop\tverbose options:" << endl;
		cout << "\t 0 show only final result" << endl;
		cout << "\t 1 show intermmediate results" << endl;
		return 1;
	}
	
	// Get verbose option
	bool VERBOSE = (bool) atoi(argv[1]);
	
	// Define augmented matrix of the linear equations
	int ROW = 4;
	int COL = 5;
	double M[] = {
		1, 1, 1, 4, 21,
		1, 2, -1, 2, 9,
		2, -1, 2, 3, 16,
		-1, 1, -1, 2, 7
	};
	double m[ROW];
	
	// Define epsilon for handling small numbers
	const double eps = 1E-12;
	
	// View initial augmented matrix
	if(VERBOSE) {
		cout << "# Initial augmented matrix" << endl;
		for(int i = 0; i < ROW; i++) {
			for(int j = 0; j < COL; j++) {
				int ij = i * COL + j;
				cout << M[ij];
				if(j < COL - 1) cout << "\t";
			}
			cout << endl;
		}
		cout << endl;
	}
	// Begin row reduction operation
	for(int i = 0; i < COL - 2; i++) {
		for(int j = i + 1; j < ROW; j++) {
			int ji = j * COL + i;
			int ii = i * COL + i;
			double c = M[ji] / M[ii];
			for(int k = 0; k < COL; k++) {
				int jk = j * COL + k;
				int ik = i * COL + k;
				M[jk] = M[jk] - M[ik] * c;
				if(fabs(M[jk]) < eps) M[jk] = 0;
			}
		}
		// View every step of row reduction operation
		if(VERBOSE) {
			cout << "# Make zero of column " << i + 1;
			cout << endl;
			for(int i = 0; i < ROW; i++) {
				for(int j = 0; j < COL; j++) {
					int ij = i * COL + j;
					cout << M[ij];
					if(j < COL - 1) cout << "\t";
				}
				cout << endl;
			}
			cout << endl;
		}
	}
	
	// View echelon matrix
	if(VERBOSE) {
		cout << "# Echelon matrix" << endl;
		for(int i = 0; i < ROW; i++) {
			for(int j = 0; j < COL; j++) {
				int ij = i * COL + j;
				cout << M[ij];
				if(j < COL - 1) cout << "\t";
			}
			cout << endl;
		}
		cout << endl;
	}
	
	// Perform back substitution
	for(int i = 0; i < ROW; i++) {
		int iCOL = (ROW - 1 - i) * COL + (COL - 1);
		double y = M[iCOL];
		for(int j = 0; j < i; j++) {
			int ij = (ROW - 1 - i) * COL + (COL - 2 - j);
			double dy = m[ROW - 1 - j] * M[ij];
			if(fabs(dy) < eps) dy = 0;
			y -= dy ;
		}
		int ii = (ROW - 1 - i) * COL + (COL - 2 - i);
		double x = M[ii];
		m[ROW - 1 - i] = y / x;
		if(fabs(m[ROW - 1 - i]) < eps) m[ROW - 1 - i] = 0;
	}
	
	// View final result
	if(VERBOSE) cout << "# Solution" << endl;
	for(int i = 0; i < ROW; i++) {
		if(fabs(m[i]) < eps) m[i] = 0;
		cout << m[i] << endl;
	}
	
	// Terminate program with success state
	return 0;
}
