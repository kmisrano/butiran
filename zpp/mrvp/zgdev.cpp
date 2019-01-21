/*
	zgdev.cpp
	Granular device with a gravitation function g(x)
*/

#include <iostream>
#include "vect3.h"
#include "ball.h"
#include "force_m.h"
#include "gearpc.h"

using namespace std;

int main(int argc, char **argv) {
	ball b;
	b.m = 1;
	b.r0.x = -2;
	b.r1.x = 1;
	
	gearpc gpc;
	gpc.setdt(1E-1);
	
	double tmin = 0;
	double tmax = 4;
	double dt = 1E-1;
	double t = tmin;
	int N = (int)((tmax - tmin)/dt);
	
	for(int iN = 0; iN <= N; iN++) {
		
		double x = b.r0.x;
		cout << t << "\t";
		cout << x << endl;
		
		gpc.push(b);
		gpc.predict();
		gpc.pop(b);
		
		t += dt;
	}
	
	return 0;
}

