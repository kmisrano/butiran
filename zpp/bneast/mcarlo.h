/*
	mcarlo.h
	Library related to Monte-Carlo method
	
	Sparisoma Viridi | dudung@gmail.com
	
	Usage:
	Put #include "mcarlo.h" in the program before the function
	main().
	
	20160310
	Create this labrary.
	Create irandnum() from randomxy_01.cpp.
	Add some functions, e.g. imin(), imax(), idisp1ln(),
	isort(), distribute(), and dispdist();
	20160318
	Create bool boolrand(double, bool) function.
*/

#include <cstdlib>

using namespace std;

#ifndef MCARLO_H
#define MCARLO_H

// Functions declaration
int irandnum(int, int);
int imin(int[], int);
int imax(int[], int);
void idisp1ln(int[], int);
void isort(int[], int);
void distribute(int[], int, double[], int[], int);
void dispdist(double[], int[], int);
bool boolrand(double, bool, int);


// Functions implementation
// Generate integer random number in [i1, i2]
int irandnum(int i1, int i2) {
	int x = i1 + rand() % (i2 - i1 + 1);
	return x;
}

// Get minimum value of integer array
int imin(int x[], int Nx) {
	int xmin = x[0];
	for(int i = 1; i < Nx; i++) {
		xmin = (xmin > x[i]) ? x[i] : xmin;
	}
	return xmin;
}

// Get maximum value of integer array
int imax(int x[], int Nx) {
	int xmax = x[0];
	for(int i = 1; i < Nx; i++) {
		xmax = (xmax < x[i]) ? x[i] : xmax;
	}
	return xmax;
}

// Sort values of integer array
void isort(int x[], int Nx) {
	for(int i = 0; i < Nx - 1; i++) {
		for(int j = i + 1; j < Nx; j++) {
			if(x[i] > x[j]) {
				swap(x[i], x[j]);
			}
		}
	}
}

// Display values of integer in one line
void idisp1ln(int x[], int Nx) {
	for(int ix = 0; ix < Nx; ix++) {
		cout << x[ix];
		if(ix < Nx - 1) cout  << " ";
	}
	cout << endl;
}

// Distribute x values to y groups
void distribute(int x[], int Nx,
	double xx[], int yy[], int Ny) {
	// Get minimum and maximum
	int xmin = imin(x, Nx);
	int xmax = imax(x, Nx);
	
	// Calculate width of each group
	double dx = 1.0 * (xmax - xmin + 1) / Ny;
	
	for(int iy = 0; iy < Ny; iy++) {
		yy[iy] = 0;
		xx[iy] = xmin + 0.25 * dx + iy * dx;
	}
	
	// Distribute
	for(int ix = 0; ix < Nx; ix++) {
		for(int iy = 0; iy < Ny; iy++) {
			double gmin = xx[iy] - 0.5 * dx;
			double gmax = xx[iy] + 0.5 * dx;
			bool minlte = (gmin < x[ix]);
			if(iy == 0) {
				minlte = (gmin <= x[ix]);
			}
			bool ltemax = (x[ix] <= gmax);
			if(minlte && ltemax) {
				yy[iy]++;
			}
		}
	}
}

// View distribution result
void dispdist(double xx[], int yy[], int N) {
	for(int i = 0; i < N; i++) {
		cout << xx[i] << "\t";
		cout << yy[i] << endl;
	}
}

// Generate random bool with prob probability
bool boolrand(double prob, bool state, int N) {
	int M = N * prob;
	int i = irandnum(1, N);
	bool result = (i <= M) ? state : !state;
	return result;
}

#endif
