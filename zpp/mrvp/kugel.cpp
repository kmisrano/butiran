/*
	kugel.cpp
	Molecular Dynamics Simulation based on solid sphere
	Sparisoma Viridi, (CC 2012) CC:BY-SA-NC
	20121125.1
	Note: derived from drude-simul.cpp
	Compile: g++ kugel.cpp -o kugel
	Run: ./kugel
	Version:
		20121124.0 All codes from various projects are merged
		20121125.0 Total kinetic energy and deflection angle
		           code are added
		20121125.1 Barrier force is constructed and integrated
		           into kugel code
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
#include "tcoords.h"
#include "force_n.h"
#include "force_q.h"
#include "gearpc.h"
#include "cyclex.h"
#include "geninput.h"
#include "cs.h"
#include "force_b.h"

using namespace std;

// Simulate input parameters and produce output parameters
void simulate(char*, char*, char*);

// Main program
int main(int argc, char **argv) {
	// How to run this code
	if(argc < 2) {
		cout << "Usage: ./kugel -l" << endl;
		return 0;
	} else if(argc > 1) {
		int opt = -1;
		char *option = argv[1];
		
		// Available options
		opt = strcmp(option, "-l");
		if(opt == 0) {
			cout << "Available options:" << endl;
			cout << " -l" << endl;
			cout << " -i input" << endl;
			cout << " -s input output data" << endl;
			return 0;
		}
		
		// Generate input
		opt = strcmp(option, "-i");
		if(opt == 0) {
			char fn[32];
			strcpy(fn, "input.txt");
			if(argc > 2) {
				strcpy(fn, argv[2]);
			}
			cout << "Generate input: " << fn << endl;
			generateinput(fn);
			return 0;
		}
		
		// Simulate input and produce output
		opt = strcmp(option, "-s");
		if(opt == 0) {
			char ifn[32];
			strcpy(ifn, "input.txt");
			if(argc > 2) {
				strcpy(ifn, argv[2]);
			}
			char ofn[32];
			strcpy(ofn, "output.txt");
			if(argc > 3) {
				strcpy(ofn, argv[3]);
			}
			char sfn[32];
			strcpy(sfn, "series.txt");
			if(argc > 4) {
				strcpy(sfn, argv[4]);
			}
			cout << "Read input: " << ifn << endl;
			simulate(ifn, ofn, sfn);
			cout << "Series output: " << sfn << endl;
			cout << "Generate output: " << ofn << endl;
			return 0;
		}
		
		cout << "Error: option is not available" << endl;
	}

return 0;
}

// Simulate input parameters and produce output parameters
void simulate(char *ifn, char *ofn, char *sfn) {
	//
	// Reading parameters as input
	//
	
	// Drawing coordinates
	int xdmin = 0;
	int ydmin = 0;
	int xdmax = 0;
	int ydmax = 0;
	readparam(ifn, "XDMIN", xdmin);
	readparam(ifn, "YDMIN", ydmin);
	readparam(ifn, "XDMAX", xdmax);
	readparam(ifn, "YDMAX", ydmax);
	
	// Real coordinates
	double xrmin = 0;
	double yrmin = 0;
	double xrmax = 0;
	double yrmax = 0;
	readparam(ifn, "XRMIN", xrmin);
	readparam(ifn, "YRMIN", yrmin);
	readparam(ifn, "XRMAX", xrmax);
	readparam(ifn, "YRMAX", yrmax);
	
	// Time parameters
	double dt = 0;
	double tmin = 0;
	double tmax = 0;
	bool CONT = false;
	readparam(ifn, "DT", dt);
	readparam(ifn, "TMIN", tmin);
	readparam(ifn, "TMAX", tmax);
	readparam(ifn, "CONT", CONT);
	gearpc gpc;
	gpc.setdt(dt);
	double t = tmin;
	
	// Electrostatic force parameters
	double kq = 0;
	readparam(ifn, "KQ", kq);
	force_q fq(kq);
	
	// Normal force parameters
	double kn = 0;
	double gn = 0;
	readparam(ifn, "KN", kn);
	readparam(ifn, "GN", gn);
	force_n fn(kn, gn);
	
	// Barrier force parameters
	double kb = 0;
	double Ub0 = 0;
	double rb0 = 0;
	double rbmin = 0;
	double rbmax = 0;
	readparam(ifn, "KB", kb);
	readparam(ifn, "UB0", Ub0);
	readparam(ifn, "RB0", rb0);
	readparam(ifn, "RBMIN", rbmin);
	readparam(ifn, "RBMAX", rbmax);
	force_b fb;
	fb.k_b = kb;
	fb.U_b0 = Ub0;
	fb.r_b0 = rb0;
	fb.r_bmin = rbmin;
	fb.r_bmax = rbmax;
	
	// Die Kugelzahl
	int N = 0;
	readparam(ifn, "N", N);
	ball grains[N];
	
	// Die Kugel
	int lw = ceil(log10(N));
	stringstream ss;
	char vn[lw];
	
	for(int iN = 0; iN < N; iN ++) {
		double x;
		double y;
		double z;
		double vx;
		double vy;
		double vz;
		double m;
		double d;
		double q;
		double cx;
		double cy;
		double cz;
		double b;
		
		ss.width(lw);
		ss.fill('0');
		ss << iN;
		ss >> vn;
		ss.clear();
		
		ss << "RX" << vn;
		char xs[2 + lw];
		ss >> xs;
		ss.clear();
		
		ss << "RY" << vn;
		char ys[2 + lw];
		ss >> ys;
		ss.clear();
		
		ss << "RZ" << vn;
		char zs[2 + lw];
		ss >> zs;
		ss.clear();
		
		ss << "VX" << vn;
		char vxs[2 + lw];
		ss >> vxs;
		ss.clear();
		
		ss << "VY" << vn;
		char vys[2 + lw];
		ss >> vys;
		ss.clear();
		
		ss << "VZ" << vn;
		char vzs[2 + lw];
		ss >> vzs;
		ss.clear();
		
		ss << "M" << vn;
		char ms[1 + lw];
		ss >> ms;
		ss.clear();
		
		ss << "D" << vn;
		char ds[1 + lw];
		ss >> ds;
		ss.clear();
		
		ss << "Q" << vn;
		char qs[1 + lw];
		ss >> qs;
		ss.clear();
		
		ss << "CX" << vn;
		char csx[1 + lw];
		ss >> csx;
		ss.clear();
		
		ss << "CY" << vn;
		char csy[1 + lw];
		ss >> csy;
		ss.clear();
		
		ss << "CZ" << vn;
		char csz[1 + lw];
		ss >> csz;
		ss.clear();
		
		ss << "B" << vn;
		char bs[1 + lw];
		ss >> bs;
		ss.clear();
		
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
		
		readparam(ifn, xs, x);
		readparam(ifn, ys, y);
		readparam(ifn, zs, z);
		readparam(ifn, vxs, vx);
		readparam(ifn, vys, vy);
		readparam(ifn, vzs, vz);
		readparam(ifn, ms, m);
		readparam(ifn, ds, d);
		readparam(ifn, qs, q);
		readparam(ifn, csx, cx);
		readparam(ifn, csy, cy);
		readparam(ifn, csz, cz);
		readparam(ifn, bs, b);
		
		grains[iN].r0 = vect3(x, y, z);
		grains[iN].r1 = vect3(vx, vy, vz);
		grains[iN].m = m;
		grains[iN].d = d;
		grains[iN].q = q;
		grains[iN].c = vect3(cx, cy, cz);
		grains[iN].b = b;
	}
	
	//
	// Simulation
	//
	
	stringstream process;
	ofstream fout;
	fout.open(sfn);
	
	double r0y = grains[0].r0.y;
	double r1y = grains[1].r0.y;
	double r01y = r0y - r1y;
	cout << "r_01,y = " << r01y << endl;
	
	double K;
	K = 0;
	for(int iN = 0; iN < N; iN++) {
		double v = grains[iN].r1.len();
		double m = grains[iN].m;
		K += (0.5 * m * v * v);
	}
	cout << "K_i = " << K << endl;
	
	double U, q0, q1, d01;
	q0 = grains[0].q;
	q1 = grains[1].q;
	d01 = (grains[0].r0 - grains[1].r0).len();
	U = kq * q0 * q1 / d01;
	cout << "U_i = " << U << endl;
	
	cout << "U_i + K_i = " << U + K << endl;
	
	vect3 v0i, v1i;
	v0i = grains[0].r1;
	v1i = grains[1].r1;
	cout << "v_0,i = " << v0i.str() << endl;
	cout << "v_1,i = " << v1i.str() << endl;
	
	fout << "#t\tx1\ty1\tx2\ty2" << endl;
	
	while(t < tmax) {
		// Prediction step
		for(int iN = 0; iN < N; iN++) {
			gpc.push(grains[iN]);
			gpc.predict();
			gpc.pop(grains[iN]);
		}
		
		// Force calculation
		vect3 Sf[N];
		for(int iN = 0; iN < N; iN++) {
			int id1 = iN;
			int id2 = cycleid(0, N, iN + 1);
			vect3 fN = fn.force(grains[id1], grains[id2]);
			vect3 fQ = fq.force(grains[id1], grains[id2]);
			vect3 fB = fb.force(grains[id1], grains[id2]);
			Sf[iN] = fN + fQ + fB;
			
			// cout << fB.len() << endl;
		}
		// double d01 = (grains[0].r0 - grains[1].r0).len();
		// cout << d01 << endl;
		
		
		// Correction step
		for(int iN = 0; iN < N; iN++) {
			double m = grains[iN].m;
			vect3 a = Sf[iN] / m;
			gpc.push(grains[iN]);
			gpc.correct(a);
			gpc.pop(grains[iN]);
		}
		
		fout << t << "\t";
		for(int iN = 0; iN < N; iN++) {
			fout << grains[iN].r0.x;
			fout << "\t";
			fout << grains[iN].r0.y;
			if(iN < N-1) {
				fout << "\t";
			} else {
				fout << endl;
			}
		}
		
		// Increase time
		t += dt;
		
		// Progress indicator
		double tt = (t - tmin) / (tmax - tmin);
		double bar = 0.1 * floor(1000 * tt);
		stringstream sbar;
		sbar << process.str();
		sbar << bar << " %  ";
		sbar << "\r";
		cout << "Process: " << sbar.str();
		cout.flush();
	}
	cout << endl;
	
	fout.close();
	
	K = 0;
	for(int iN = 0; iN < N; iN++) {
		double v = grains[iN].r1.len();
		double m = grains[iN].m;
		K += (0.5 * m * v * v);
	}
	cout << "K_f = " << K << endl;
	
	q0 = grains[0].q;
	q1 = grains[1].q;
	d01 = (grains[0].r0 - grains[1].r0).len();
	U = kq * q0 * q1 / d01;
	cout << "U_f = " << U << endl;
	
	cout << "U_f + K_f = " << U + K << endl;
	
	vect3 v0f, v1f;
	v0f = grains[0].r1;
	v1f = grains[1].r1;
	cout << "v_0,f = " << v0f.str() << endl;
	cout << "v_1,f = " << v1f.str() << endl;
	
	double th0 = acos((v0i | v0f) / (v0i.len() * v0f.len()));
	double th1 = acos((v1i | v1f) / (v1i.len() * v1f.len()));
	
	cout << "\\theta_0 = " << th0 << endl;
	cout << "\\theta_1 = " << th1 << endl;
	
	//
	// Writing parameters as output
	//
	
	// Preparing new file
	writenewfile(ofn);
	
	// Drawing coordinates
	writecomment(ofn, "# Drawing coordinates");
	writeparam(ofn, "XDMIN", xdmin);
	writeparam(ofn, "YDMIN", ydmin);
	writeparam(ofn, "XDMAX", xdmax);
	writeparam(ofn, "YDMAX", ydmax);
	
	writenewline(ofn);
	
	// Real coordinates
	writecomment(ofn, "# Real coordinates");
	writeparam(ofn, "XRMIN", xrmin);
	writeparam(ofn, "YRMIN", yrmin);
	writeparam(ofn, "XRMAX", xrmax);
	writeparam(ofn, "YRMAX", yrmax);
	
	writenewline(ofn);
	
	// Time parameters
	writecomment(ofn, "# Time parameters");
	writeparam(ofn, "DT", dt);
	writeparam(ofn, "TMIN", tmin);
	writeparam(ofn, "TMAX", tmax);
	writeparam(ofn, "CONT", CONT);
	
	writenewline(ofn);
	
	// Electrostatic force parameters
	writecomment(ofn, "# Electrostatic force parameters");
	writeparam(ofn, "KQ", kq);
	
	writenewline(ofn);
	
	// Normal force parameters
	writecomment(ofn, "# Normal force parameters");
	writeparam(ofn, "KN", kn);
	writeparam(ofn, "GN", gn);
	
	writenewline(ofn);
	
	// Barrier force parameters
	writecomment(ofn, "# Barrier force parameters");
	writeparam(ofn, "KB", kb);
	writeparam(ofn, "UB0", Ub0);
	writeparam(ofn, "RB0", rb0);
	writeparam(ofn, "RBMIN", rbmin);
	writeparam(ofn, "RBMAX", rbmax);
	
	writenewline(ofn);
	
	// Die Kugelzahl
	writecomment(ofn, "# Number of grains");
	writeparam(ofn, "N", N);
	
	writenewline(ofn);
	
	for(int iN = 0; iN < N; iN ++) {
		double x = grains[iN].r0.x;
		double y = grains[iN].r0.y;
		double z = grains[iN].r0.z;
		double vx = grains[iN].r1.x;
		double vy = grains[iN].r1.y;
		double vz = grains[iN].r1.z;
		double m = grains[iN].m;
		double d = grains[iN].d;
		double q = grains[iN].q;
		double cx = grains[iN].c.x;
		double cy = grains[iN].c.y;
		double cz = grains[iN].c.z;
		double b = grains[iN].b;
		
		ss.width(lw);
		ss.fill('0');
		ss << iN;
		ss >> vn;
		ss.clear();
		
		ss << "RX" << vn;
		char xs[2 + lw];
		ss >> xs;
		ss.clear();
		
		ss << "RY" << vn;
		char ys[2 + lw];
		ss >> ys;
		ss.clear();
		
		ss << "RZ" << vn;
		char zs[2 + lw];
		ss >> zs;
		ss.clear();
		
		ss << "VX" << vn;
		char vxs[2 + lw];
		ss >> vxs;
		ss.clear();
		
		ss << "VY" << vn;
		char vys[2 + lw];
		ss >> vys;
		ss.clear();
		
		ss << "VZ" << vn;
		char vzs[2 + lw];
		ss >> vzs;
		ss.clear();
		
		ss << "M" << vn;
		char ms[1 + lw];
		ss >> ms;
		ss.clear();
		
		ss << "D" << vn;
		char ds[1 + lw];
		ss >> ds;
		ss.clear();
		
		ss << "Q" << vn;
		char qs[1 + lw];
		ss >> qs;
		ss.clear();
		
		ss << "CX" << vn;
		char csx[1 + lw];
		ss >> csx;
		ss.clear();
		
		ss << "CY" << vn;
		char csy[1 + lw];
		ss >> csy;
		ss.clear();
		
		ss << "CZ" << vn;
		char csz[1 + lw];
		ss >> csz;
		ss.clear();
		
		ss << "B" << vn;
		char bs[1 + lw];
		ss >> bs;
		ss.clear();
		
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
		writeparam(ofn, csx, cx);
		writeparam(ofn, csy, cy);
		writeparam(ofn, csz, cz);
		writeparam(ofn, bs, b);
		
		if(iN < N-1) writenewline(ofn);
	}
}
