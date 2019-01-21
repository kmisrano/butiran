/*
	asteroids-collapse.cpp
	Simulation of collapsing spherical grains into some
	asteroids.
	
	Sparisoma Viridi | dudung@fi.itb.ac.id
	Budi Dermawan | budider@as.itb.ac.id
	
	Compile: g++ asteroids-collapse.cpp -o asteroids-collapse
	Execute: ./asteroids-collapse [options]
	
	20160426
	Begin the code of this project.
	20160427
	Continue improving the program by changing format of input
	file (particles.txt, postitions.txt, and velocities.txt are
	merged into a single file).
*/

#include <iostream>
#include <fstream>
#include <cstring>
#include <cmath>

#include "textfile.h"
#include "strval.h"
#include "ball.h"
#include "forces.h"
#include "mdynamics.h"

using namespace std;

int main(int argc, char *argv[]) {
	// Define program name
	const char *pname = "asteroids-collapse";
	
	// Verbose usage
	if(argc < 3) {
		cout << "Usage: " << pname << " [parif parff]";
		cout << endl;
		cout << "parif\tparticles initial properties file";
		cout << "parff\tparticles final properties file";
		cout << endl;
		return 1;
	}
	
	// Get arguments
	const char *parifn = argv[1];
	const char *parffn = argv[2];
	
	// Check number of data
	int N = dataline(parifn);
	
	// Get particles properties
	double rho[N];
	double d[N];
	vect3 r[N];
	vect3 v[N];
	datafcol(parifn, 0, rho);
	datafcol(parifn, 1, d);
	datafcol(parifn, 2, r);
	datafcol(parifn, 5, v);
	
	// Define particles
	ball b[N];
	for(int i = 0; i < N; i++) {
		b[i].r = r[i];
		b[i].v = v[i];
		b[i].d = d[i];
		double d = b[i].d;
		double V = (M_PI / 6) * (d * d * d);
		double m = rho[i] * V;
		b[i].m = m;
	}
	
	// Perform molecular dynamics calculation
	double tbeg = 0;
	double tend = 10;
	double dt = 1E-2;
	double Nt = floor((tend - tbeg) / dt) + 1;
	for(int it = 0; it < Nt; it++) {
		// Calculate forces
		vect3 SF[N];
		double kG = 6.67408E-11;
		kG = 1E-7;
		for(int i = 0; i < N; i++) {
			for(int j = 0; j < N; j++) {
				if(i != j) {
					SF[i] = SF[i] + fG(b[i], b[j], kG);
				}
			}
		}
		double kN = 1E4;
		double gN = 0.5;
		for(int i = 0; i < N; i++) {
			for(int j = 0; j < N; j++) {
				if(i != j) {
					SF[i] = SF[i] + fN(b[i], b[j], kN, gN);
				}
			}
		}
		
		// Calculate acceleration
		for(int i = 0; i < N; i++) {
			double m = b[i].m;
			vect3 a = SF[i] / m;
			b[i].a = a;
		}
		
		// Integrate numerically
		for(int i = 0; i < N; i++) {
			intEuler(b[i].r, b[i].v, b[i].a, dt);
		}
	}
		
	// Define output stream
	ofstream fout;
	
	// Write all properties
	fout.open(parffn);
	fout << "# rho\td\trx\try\trz\tvx\tvy\tvz" << endl;
	for(int i = 0; i < N; i++) {
		fout << rho[i] << "\t";
		fout << d[i] << "\t";
		fout << b[i].r.x << "\t";
		fout << b[i].r.y << "\t";
		fout << b[i].r.z << "\t";
		
		// Force velocity to zero
		b[i].v = vect3();
		
		fout << b[i].v.x << "\t";
		fout << b[i].v.y << "\t";
		fout << b[i].v.z << endl;
	}
	fout.close();
		
	// Terminate program with succes state
	return 0;
}