/*
	ising-hfield.cpp
	Calculate H field from Ising model
	Sparisoma Viridi
	20120314
	Note: derived from ising-hfield.cpp
	Compile: g++ ising-hfield.cpp -o ising-hfield
	Run: ./ising-hfield up down Nup Ndown input output
	History:
		20120313 ising-hfield.cpp is built and designed
		         (not yet finished)
		20120314 H field calculation is constructed
*/

#include <iostream>
#include <fstream>
#include <sstream>
#include <cstdlib>
#include <string.h>
#include <math.h>
#include "ball.h"
#include "vect3.h"
#include "rwparams.h"
#include "cyclex.h"

using namespace std;

int main(int argc, char **argv) {
	// How to run this code
	if(argc < 5) {
		cout << "Usage: ./ising-hfield eps U input";
		cout << " output" << endl;
		cout << "eps\tinteraction between spins" << endl;
		cout << "U\ttotal energy of spin configuration";
		cout << endl;
		cout << "input\tconfiguration-file" << endl;
		cout << "output\tconfiguration-file" << endl;
		return 0;
	}
	
	// The files
	double eps = atof(argv[1]);
	double U = atof(argv[2]);
	const char *ifn = argv[3];
	const char *ofn = argv[4];
	
	
	// Define and check input file by opening it
	ifstream fin;
	
	fin.open(ifn);
	if(!fin) {
		cerr << "Error: " << ifn;
		cerr << " could not be opened" << endl;
		exit(1);
	}
	
	// Read configuration
	double xrmin = -1;
	double yrmin = -1;
	double xrmax = -1;
	double yrmax = -1;
	readparam(ifn, "XRMIN", xrmin);
	readparam(ifn, "YRMIN", yrmin);
	readparam(ifn, "XRMAX", xrmax);
	readparam(ifn, "YRMAX", yrmax);
	
	double xpmin = -1;
	double ypmin = -1;
	double xpmax = -1;
	double ypmax = -1;
	readparam(ifn, "XPMIN", xpmin);
	readparam(ifn, "YPMIN", ypmin);
	readparam(ifn, "XPMAX", xpmax);
	readparam(ifn, "YPMAX", ypmax);
	
	double dt = 0;
	double tmin = 0;
	double tmax= 0;
	bool CONT = false;
	readparam(ifn, "DT", dt);
	readparam(ifn, "TMIN", tmin);
	readparam(ifn, "TMAX", tmax);
	readparam(ifn, "CONT", CONT);
	
	double gx = 0;
	double gy = 0;
	double gz = 0;
	readparam(ifn, "GX", gx);
	readparam(ifn, "GY", gy);
	readparam(ifn, "GZ", gz);
	
	double Ex = 0;
	double Ey = 0;
	double Ez = 0;
	readparam(ifn, "EX", Ex);
	readparam(ifn, "EY", Ey);
	readparam(ifn, "EZ", Ez);
	
	double Bx = 0;
	double By = 0;
	double Bz = 0;
	readparam(ifn, "BX", Bx);
	readparam(ifn, "BY", By);
	readparam(ifn, "BZ", Bz);
	
	double kn = 0;
	double ks = 0;
	double gn = 0;
	readparam(ifn, "KN", kn);
	readparam(ifn, "KS", ks);
	readparam(ifn, "GN", gn);
	
	int Nx = 0;
	int Ny = 0;
	readparam(ifn, "NX", Nx);
	readparam(ifn, "NY", Ny);
	
	int N = 0;
	readparam(ifn, "N", N);
	int lw = (int) ceil(log10(N));
	stringstream sss;
	char vn[lw];
	ball grains[N];
	for(int i = 0; i < N; i++) {
		strcpy(vn, "");
		
		sss.width(lw);
		sss.fill('0');
		sss << i;
		sss >> vn;
		sss.clear();
		
		double x = -1;
		sss << "RX" << vn;
		char xs[2 + lw];
		sss >> xs;
		sss.clear();
		readparam(ifn, xs, x);
		grains[i].r0.x = x;
		
		double y = -1;
		sss << "RY" << vn;
		char ys[2 + lw];
		sss >> ys;
		sss.clear();
		readparam(ifn, ys, y);
		grains[i].r0.y = y;
		
		double z = -1;
		sss << "RZ" << vn;
		char zs[1 + lw];
		sss >> zs;
		sss.clear();
		readparam(ifn, zs, z);
		grains[i].r0.z = z;
		
		double vx = -1;
		sss << "VX" << vn;
		char vxs[2 + lw];
		sss >> vxs;
		sss.clear();
		readparam(ifn, vxs, vx);
		grains[i].r1.x = vx;
		
		double vy = -1;
		sss << "VY" << vn;
		char vys[2 + lw];
		sss >> vys;
		sss.clear();
		readparam(ifn, vys, vy);
		grains[i].r1.y = vy;
		
		double vz = -1;
		sss << "VZ" << vn;
		char vzs[1 + lw];
		sss >> vzs;
		sss.clear();
		readparam(ifn, vzs, vz);
		grains[i].r1.z = vz;
		
		double m = -1;
		sss << "M" << vn;
		char ms[1 + lw];
		sss >> ms;
		sss.clear();
		readparam(ifn, ms, m);
		grains[i].m = m;
		
		double d = -1;
		sss << "D" << vn;
		char ds[1 + lw];
		sss >> ds;
		sss.clear();
		readparam(ifn, ds, d);
		grains[i].d = d;
		
		double q = -1;
		sss << "Q" << vn;
		char qs[1 + lw];
		sss >> qs;
		sss.clear();
		readparam(ifn, qs, q);
		grains[i].q = q;
		
		double c = -1;
		sss << "C" << vn;
		char cs[1 + lw];
		sss >> cs;
		sss.clear();
		readparam(ifn, cs, c);
		grains[i].c = c;
		
		double b = -1;
		sss << "B" << vn;
		char bs[1 + lw];
		sss >> bs;
		sss.clear();
		readparam(ifn, bs, b);
		grains[i].b = b;
		
		double s = -1;
		sss << "S" << vn;
		char ss[1 + lw];
		sss >> ss;
		sss.clear();
		readparam(ifn, ss, s);
		grains[i].s = s;
	}
	
	// H field calculation
	double H = 0;
	int ix = 0;
	int iy = 0;
	double spin[Nx][Ny];
	int idx[N];
	int idy[N];
	for(int i = 0; i < N; i++) {
		if(ix == Nx) {
			ix = 0;
			iy++;
		}
		
		idx[i] = ix;
		idy[i] = iy;
		spin[idx[i]][idy[i]] = grains[i].s;
		
		ix++;
	}
	
	// Interaction between H field and all spin
	double Sspin = 0;
	for(int i = 0; i < N; i++) {
		Sspin += spin[idx[i]][idy[i]];
	}
	Sspin *= -1;
	
	// Interaction between a spin and its neigbors
	double Sspinspin = 0;
	for(int i = 0; i < N; i++) {
		int ix = idx[i];
		int iy = idy[i];
		double spinC = spin[ix][iy];
		
		ix = cycleid(0, Nx, idx[i] + 0);
		iy = cycleid(0, Ny, idy[i] + 1);
		double spinN = spin[ix][iy];
		
		ix = cycleid(0, Nx, idx[i] + 1);
		iy = cycleid(0, Ny, idy[i] + 0);
		double spinE = spin[ix][iy];
		
		ix = cycleid(0, Nx, idx[i] + 0);
		iy = cycleid(0, Ny, idy[i] - 1);
		double spinS = spin[ix][iy];
		
		ix = cycleid(0, Nx, idx[i] - 1);
		iy = cycleid(0, Ny, idy[i] + 0);
		double spinW = spin[ix][iy];
		
		double neighbors = spinN + spinE + spinS + spinW;
		double dspin = -eps * spinC * neighbors;
		Sspinspin += dspin;
	}
	
	if(Sspin == 0) {
		H = 0;
	} else {
		H = (U - Sspinspin) / Sspin;
	}
	
	//cout << Sspin << "\t" << Sspinspin << "\t" << H << endl;
	
	// Write final configuration
	writenewfile(ofn);
	
	writecomment(ofn, "# Real coordinates");
	writeparam(ofn, "XRMIN", xrmin);
	writeparam(ofn, "YRMIN", yrmin);
	writeparam(ofn, "XRMAX", xrmax);
	writeparam(ofn, "YRMAX", yrmax);
	writenewline(ofn);
	
	writecomment(ofn, "# Picture coordinates");
	writeparam(ofn, "XPMIN", xpmin);
	writeparam(ofn, "YPMIN", ypmin);
	writeparam(ofn, "XPMAX", xpmax);
	writeparam(ofn, "YPMAX", ypmax);
	writenewline(ofn);
	
	writecomment(ofn, "# Time parameters");
	writeparam(ofn, "DT", dt);
	writeparam(ofn, "TMIN", tmin);
	writeparam(ofn, "TMAX", tmax);
	writeparam(ofn, "CONT", CONT);
	writenewline(ofn);
	
	writecomment(ofn, "# Constant gravitation field");
	writeparam(ofn, "GX", gx);
	writeparam(ofn, "GY", gy);
	writeparam(ofn, "GZ", gz);
	writenewline(ofn);
	
	writecomment(ofn, "# Constant electric field");
	writeparam(ofn, "EX", Ex);
	writeparam(ofn, "EY", Ey);
	writeparam(ofn, "EZ", Ez);
	writenewline(ofn);
	
	writecomment(ofn, "# Constant magnetic field");
	writeparam(ofn, "BX", Bx);
	writeparam(ofn, "BY", By);
	writeparam(ofn, "BZ", Bz);
	writenewline(ofn);
	
	writecomment(ofn, "# Normal spin force constants");
	writeparam(ofn, "KN", kn);
	writeparam(ofn, "KS", ks);
	writeparam(ofn, "GN", gn);
	writenewline(ofn);
	
	writecomment(ofn, "# Simple cubic 2-D");
	writeparam(ofn, "NX", Nx);
	writeparam(ofn, "NY", Ny);
	writenewline(ofn);
	
	writecomment(ofn, "# Ising model");
	writeparam(ofn, "EPS", eps);
	writeparam(ofn, "U", U);
	writeparam(ofn, "H", H);
	writenewline(ofn);
	
	writecomment(ofn, "# Number of grains");
	writeparam(ofn, "N", N);
	writenewline(ofn);
	
	for(int i = 0; i < N; i++) {
		strcpy(vn, "");
		
		sss.width(lw);
		sss.fill('0');
		sss << i;
		sss >> vn;
		sss.clear();
		
		double x = grains[i].r0.x;
		sss << "RX" << vn;
		char xs[2 + lw];
		sss >> xs;
		sss.clear();
		
		double y = grains[i].r0.y;
		sss << "RY" << vn;
		char ys[2 + lw];
		sss >> ys;
		sss.clear();
		
		double z = grains[i].r0.z;
		sss << "RZ" << vn;
		char zs[1 + lw];
		sss >> zs;
		sss.clear();
		
		double vx = grains[i].r1.x;
		sss << "VX" << vn;
		char vxs[2 + lw];
		sss >> vxs;
		sss.clear();
		
		double vy = grains[i].r1.y;
		sss << "VY" << vn;
		char vys[2 + lw];
		sss >> vys;
		sss.clear();
		
		double vz = grains[i].r1.z;
		sss << "VZ" << vn;
		char vzs[1 + lw];
		sss >> vzs;
		sss.clear();
		
		double m = grains[i].m;
		sss << "M" << vn;
		char ms[1 + lw];
		sss >> ms;
		sss.clear();
		
		double d = grains[i].d;
		sss << "D" << vn;
		char ds[1 + lw];
		sss >> ds;
		sss.clear();
		
		double q = grains[i].q;
		sss << "Q" << vn;
		char qs[1 + lw];
		sss >> qs;
		sss.clear();
		
		double c = grains[i].c;
		sss << "C" << vn;
		char cs[1 + lw];
		sss >> cs;
		sss.clear();
		
		double b = grains[i].b;
		sss << "B" << vn;
		char bs[1 + lw];
		sss >> bs;
		sss.clear();
		
		double s = grains[i].s;
		sss << "S" << vn;
		char ss[1 + lw];
		sss >> ss;
		sss.clear();
		
		stringstream st;
		st << "# Grain " << vn;
		char ns[8 + lw];
		char nt[8 + lw];
		st >> ns;
		strcpy(nt, ns);
		st >> ns;
		strcat(nt, " ");
		strcat(nt, ns);
		st >> ns;
		strcat(nt, " ");
		strcat(nt, ns);
		st.clear();
		
		writecomment(ofn, nt);
		writeparam(ofn, xs, x);
		writeparam(ofn, ys, y);
		writeparam(ofn, zs, z);
		writeparam(ofn, vxs, vx);
		writeparam(ofn, vys, vy);
		writeparam(ofn, vzs, vz);
		writeparam(ofn, ms, m);
		writeparam(ofn, ds, d);
		writeparam(ofn, qs, q);
		writeparam(ofn, cs, c);
		writeparam(ofn, bs, b);
		writeparam(ofn, ss, s);
		writenewline(ofn);
	}
	
	stringstream args;
	for(int i = 0; i < argc; i++) {
		args << argv[i];
		if(i < argc - 1) args <<  " ";
	}
	cout << args.str() << endl;
	
	return 0;
}
