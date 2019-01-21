/*
	geninput.h
	Sparisoma Viridi
	20121124
	Generate default input
*/

#include <string.h>
#include <fstream>
#include <sstream>

using namespace std;

#ifndef geninput_h
#define geninput_h

// Simulate input parameters
void generateinput(char *ofn) {
	// Preparing new file
	writenewfile(ofn);
	
	// Drawing coordinates
	int width = 400;
	int height = 400;
	int dx = 10;
	int dy = 10;
	int xdmin = -dx;
	int ydmin = -dy;
	int xdmax = xdmin+ width + 2*dx;
	int ydmax = ydmin + height + 2*dy;
	writecomment(ofn, "# Drawing coordinates");
	writeparam(ofn, "XDMIN", xdmin);
	writeparam(ofn, "YDMIN", ydmin);
	writeparam(ofn, "XDMAX", xdmax);
	writeparam(ofn, "YDMAX", ydmax);
	
	writenewline(ofn);
	
	// Real coordinates
	double Lx = 1;
	double Ly = 1;
	double rx = 0.2;
	double ry = 0.2;
	double xrmin = -rx;
	double yrmin = -ry;
	double xrmax = xrmin + Lx + 2 * rx; 
	double yrmax = yrmin + Ly + 2 * ry; 
	writecomment(ofn, "# Real coordinates");
	writeparam(ofn, "XRMIN", xrmin);
	writeparam(ofn, "YRMIN", yrmin);
	writeparam(ofn, "XRMAX", xrmax);
	writeparam(ofn, "YRMAX", yrmax);
	
	writenewline(ofn);
	
	// Time parameters
	double dt = 1E-5;
	double tmin = 0;
	double tmax = 2;
	bool CONT = false;
	writecomment(ofn, "# Time parameters");
	writeparam(ofn, "DT", dt);
	writeparam(ofn, "TMIN", tmin);
	writeparam(ofn, "TMAX", tmax);
	writeparam(ofn, "CONT", CONT);
	
	writenewline(ofn);
	
	// Electrostatic force parameters
	double kq = 0;
	writecomment(ofn, "# Electrostatic force parameters");
	writeparam(ofn, "KQ", kq);
	
	writenewline(ofn);
	
	// Normal force parameters
	double kn = 1E4;
	double gn = 0;
	writecomment(ofn, "# Normal force parameters");
	writeparam(ofn, "KN", kn);
	writeparam(ofn, "GN", gn);
	
	writenewline(ofn);
	
	// Barrier force parameters
	double kb = 1E3;
	double Ub0 = 0.1;
	double rb0 = 0.06;
	double rbmin = 0.05;
	double rbmax = 0.07;
	writecomment(ofn, "# Barrier force parameters");
	writeparam(ofn, "KB", kb);
	writeparam(ofn, "UB0", Ub0);
	writeparam(ofn, "RB0", rb0);
	writeparam(ofn, "RBMIN", rbmin);
	writeparam(ofn, "RBMAX", rbmax);
	
	writenewline(ofn);
	
	// Die Kugelzahl
	int N = 2;
	ball b[N];
	writecomment(ofn, "# Number of grains");
	writeparam(ofn, "N", N);
	
	writenewline(ofn);
	
	// Die Kugel
	int lw = ceil(log10(N));
	stringstream ss;
	char vn[lw];
	
	for(int iN = 0; iN < N; iN ++) {
		double x = xrmin + 0.45 * (xrmax - xrmin);
		double y = 0;
		double z = 0;
		double vx = 0.1;
		double vy = 0;
		double vz = 0;
		double m = 1;
		double d = 1E-2;
		double q = 1;
		vect3 c;
		double b = 0;
		
		if(iN == 1) {
			q = q;
			vx = -vx;
			x = xrmin + 0.55 * (xrmax - xrmin);
		}
		
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
		writeparam(ofn, csx, c.x);
		writeparam(ofn, csy, c.y);
		writeparam(ofn, csz, c.z);
		writeparam(ofn, bs, b);
		
		if(iN < N-1) writenewline(ofn);
	}
}

#endif
