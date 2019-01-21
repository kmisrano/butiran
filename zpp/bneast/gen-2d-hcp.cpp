/*
	gen-2d-hcp.cpp
	
	20160604
	Create this code with minimum comments due to ISSEL
	presentation at about noon.
*/

#include <iostream>
#include <fstream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	
	int L = 1;
	if(argc > 1) {
		L = atoi(argv[1]);
	}
	
	int N = 3;
	if(L > 1) {
		N = 1;
		int M = 0;
		for(int i = 1; i <= L-1; i++) {
			M += i;
		}
		N += (M * 6);
	}
	double grain[N];
	double x0 = 0;
	double y0 = 0;
	double x[N];
	double y[N];
	for(int i = 0; i < N; i++) {
		x[i] = 0;
		y[i] = 0;
	}
	
	double D = 1;
	double theta0 = 0;
	double rho = 2000;
		
	if(L == 1) {
		double dtheta = 2 * M_PI / 3;
		for(int i = 0; i < N; i++) {
			double theta = theta0 + dtheta * i;
			x[i] = x0 + sqrt(3) / 3 * D * cos(theta);
			y[i] = y0 + sqrt(3) / 3 * D * sin(theta);
		}
	} else {
		int i = 0;
		x[i] = x0;
		y[i] = y0;
		for(int l = 1; l < L; l++) {
			int M = l * 6;
			double dtheta = 2 * M_PI / M;
			for(int m = 0; m < M; m++) {
				double theta = theta0 + dtheta * m;
				i++;
				x[i] = x0 + l * D * cos(theta);
				y[i] = y0 + l * D * sin(theta);
			}
		}
	}
	
	/**/
	cout << "# rho\td\trx\try\trz\tvx\tvy\tvz" << endl;
	for(int i = 0; i < N; i++) {
		cout << rho << "\t" ;
		cout << D << "\t" ;
		cout << x[i] << "\t" ;
		cout << y[i] << "\t" ;
		cout << 0 << "\t" ;
		cout << 0 << "\t" ;
		cout << 0 << "\t" ;
		cout << 0 << endl;
	}
	/**/
	
	return 0;
}