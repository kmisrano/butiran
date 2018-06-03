/*
	gconfig-draw.cpp
	Sparisoma Viridi
	20120313
	Draw grains configuration
	Note: derived from dgpf.cpp
	Compile: g++ gconfig-draw.cpp -o gconfig-draw
	Run: ./gconfig-draw input output
	History:
		20120215 The first version of grains configuration
		         drawing procedure is written
		20120218 drude-draw code is released
		20120310 drude-draw is changed back to general
		         procedure for drawing grains configuration
		20120313 D = drawint --> P = picture in coordinates
*/

#include <iostream>
#include <fstream>
#include <sstream>
#include <cstdlib>
#include <string.h>
#include <math.h>
#include "ball.h"
#include "vect3.h"
#include "tcoords.h"
#include "rwparams.h"

using namespace std;

int main(int argc, char **argv) {
	bool VERBOSE = false;
	
	// How to run this code
	if(argc < 3) {
		cout << "Usage: ./gconfig-draw input output";
		cout << endl;
		cout << "input\tgrains configuration file";
		cout << endl;
		cout << "output\tpostscript file for further process";
		cout << endl;
		return 0;
	}
	
	// Define and check input file by opening it
	const char *ifn = argv[1];
	ifstream fin;
	
	fin.open(ifn);
	if(!fin) {
		cerr << "Error: " << ifn;
		cerr << " could not be opened" << endl;
		exit(1);
	}
	
	// Drawing window boundary parameters
	double XPMIN = -1;
	double YPMIN = -1;
	double XPMAX = -1;
	double YPMAX = -1;
	
	readparam(ifn, "XPMIN", XPMIN);
	readparam(ifn, "XPMIN", YPMIN);
	readparam(ifn, "XPMAX", XPMAX);
	readparam(ifn, "YPMAX", YPMAX);
	
	if(VERBOSE) {
		cout << XPMIN << endl;
		cout << YPMIN << endl;
		cout << XPMAX << endl;
		cout << YPMAX << endl;
		cout << endl;
	}
	
	// Real boundary parameters
	double XRMIN = -1;
	double YRMIN = -1;
	double XRMAX = -1;
	double YRMAX = -1;
	
	readparam(ifn, "XRMIN", XRMIN);
	readparam(ifn, "YRMIN", YRMIN);
	readparam(ifn, "XRMAX", XRMAX);
	readparam(ifn, "YRMAX", YRMAX);
	
	if(VERBOSE) {
		cout << XRMIN << endl;
		cout << YRMIN << endl;
		cout << XRMAX << endl;
		cout << YRMAX << endl;
		cout << endl;
	}
	
	// Spin properties for drawing
	bool SPIN = false;
	readparam(ifn, "SPIN", SPIN);
	double sval = 0;
	readparam(ifn, "SPIN", SPIN);
	
	// Grains properties
	int N = 0;
	readparam(ifn, "N", N);
	if(VERBOSE) {
		cout << N << endl;
		cout << endl;
	}
	
	int lw = (int) ceil(log10(N));
	
	stringstream ss;
	char vn[lw];
	ball grains[N];
	for(int i = 0; i < N; i++) {
		strcpy(vn, "");
		
		ss.width(lw);
		ss.fill('0');
		ss << i;
		ss >> vn;
		ss.clear();
		
		double x = -1;
		ss << "RX" << vn;
		char xs[2 + lw];
		ss >> xs;
		ss.clear();
		readparam(ifn, xs, x);
		grains[i].r0.x = x;
		
		double y = -1;
		ss << "RY" << vn;
		char ys[2 + lw];
		ss >> ys;
		ss.clear();
		readparam(ifn, ys, y);
		grains[i].r0.y = y;
		
		double z = -1;
		ss << "RZ" << vn;
		char zs[1 + lw];
		ss >> zs;
		ss.clear();
		readparam(ifn, zs, z);
		grains[i].r0.z = z;
		
		double vx = -1;
		ss << "VX" << vn;
		char vxs[2 + lw];
		ss >> vxs;
		ss.clear();
		readparam(ifn, vxs, vx);
		grains[i].r1.x = x;
		
		double vy = -1;
		ss << "VY" << vn;
		char vys[2 + lw];
		ss >> vys;
		ss.clear();
		readparam(ifn, vys, vy);
		grains[i].r1.y = vy;
		
		double vz = -1;
		ss << "VZ" << vn;
		char vzs[1 + lw];
		ss >> vzs;
		ss.clear();
		readparam(ifn, vzs, vz);
		grains[i].r1.z = vz;
		
		double m = -1;
		ss << "M" << vn;
		char ms[1 + lw];
		ss >> ms;
		ss.clear();
		readparam(ifn, ms, m);
		grains[i].m = m;
		
		double d = -1;
		ss << "D" << vn;
		char ds[1 + lw];
		ss >> ds;
		ss.clear();
		readparam(ifn, ds, d);
		grains[i].d = d;
		
		double q = -1;
		ss << "Q" << vn;
		char qs[1 + lw];
		ss >> qs;
		ss.clear();
		readparam(ifn, qs, q);
		grains[i].q = q;
		
		double c = -1;
		ss << "C" << vn;
		char cs[1 + lw];
		ss >> cs;
		ss.clear();
		readparam(ifn, cs, c);
		grains[i].c = c;
		
		double b = -1;
		ss << "B" << vn;
		char bs[1 + lw];
		ss >> bs;
		ss.clear();
		readparam(ifn, bs, b);
		grains[i].b = b;
	}
	
	if(VERBOSE) {
		for(int i = 0; i < N; i++) {
			cout << grains[i].r0.x << endl;
			cout << grains[i].r0.y << endl;
			cout << grains[i].r0.z << endl;
			cout << grains[i].r1.x << endl;
			cout << grains[i].r1.y << endl;
			cout << grains[i].r1.z << endl;
			cout << grains[i].m << endl;
			cout << grains[i].d << endl;
			cout << grains[i].q << endl;
			cout << grains[i].c << endl;
			cout << grains[i].b << endl;
			cout << endl;
		}
	}
	
	// Output file, where EPS code will be written into
	const char *ofn = argv[2];
	ofstream fout;
	fout.open(ofn);
	
	// Creating EPS file
	fout << "%!PS-Adobe-2.0 EPSF-2.0" << endl;
	fout << "%%Origin: " << XPMIN << " " << YPMIN << endl;
	fout << "%%BoundingBox: " << XPMIN << " " << YPMIN;
	fout << " " << XPMAX << " " << YPMAX << endl;
	fout << "1 setgray" << endl;
	fout << "0 setlinewidth" << endl;
	fout << "newpath" << endl;
	fout << XPMIN << " " << YPMIN << " moveto" << endl;
	fout << XPMIN << " " << YPMAX << " lineto" << endl;
	fout << XPMAX << " " << YPMAX << " lineto" << endl;
	fout << XPMAX << " " << YPMIN << " lineto" << endl;
	fout << "closepath" << endl;
	fout << "gsave" << endl;
	fout << "1 setgray fill" << endl;
	fout << "grestore" << endl;
	fout << "stroke" << endl;
	fout << "0 setlinewidth" << endl;
	fout << "0 setgray" << endl;
	fout << "1 setlinewidth" << endl;
	
	tcoords tx(XPMIN, XPMAX, XRMIN, XRMAX);
	tcoords ty(YPMIN, YPMAX, YRMIN, YRMAX);
	
	for(int i = 0; i < N; i++) {
		double x = grains[i].r0.x;
		double y = grains[i].r0.y;
		double r = 0.5 * grains[i].d;
		
		double X = tx.dfr(x);
		double Y = ty.dfr(y);
		double x1 = 0;
		double x2 = x1 + r;
		double X1 = tx.dfr(x1);
		double X2 = ty.dfr(x2);
		double R = X2 - X1;
		
		fout << X << " ";
		fout << Y << " ";
		fout << R << " ";
		fout << "0 360 arc closepath" << endl;
		fout << "gsave" << endl;
		if(SPIN)
			fout << grains[i].c;
		else
			fout << grains[i].c;
		fout << " setgray fill" << endl;
		fout << "grestore" << endl;
		fout << "stroke" << endl;
	}
	
	fout << "showpage" << endl;
	fout.close();
	
	stringstream args;
	for(int i = 0; i < argc; i++) {
		args << argv[i];
		if(i < argc - 1) args <<  " ";
	}
	cout << args.str() << endl;
	
	return 0;
}
