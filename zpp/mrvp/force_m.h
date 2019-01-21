/*
	force_m.h
	Sparisoma Viridi | dudung@gmail.com
	20130124
	Force on a mass due to existence of a location-dependent
	gravitation field
	
	     x < xn : g(x) = 0
	xn < x < xo : g(x) = -g
	     x = xo : g(x) = 0  --> around +/- dxo
	xo < x < xp : g(x) = +g
	xp < x      : g(x) = 0
*/

#ifndef force_m_h
#define force_m_h

#ifndef vect3_h
#include "vect3.h"
#endif

#ifndef ball_h
#include "ball.h"
#endif

class force_m {
private:
	double dxo;
public:
	void setdxo(double);
	vect3 dir;
	double g;
	double xn, xo, xp;
	force_m(void);
	~force_m(void);
	vect3 forcex(ball);
};

force_m::force_m(void) {
	dxo = 1E-6;
	dir = vect3(0, 0, 0);
	g = 0;
	xn = 0;
	xo = 0;
	xp = 0;
}

force_m::~force_m(void) {
	dir = vect3(0, 0, 0);
	g = 0;
	xn = 0;
	xo = 0;
	xp = 0;
}

void force_m::setdxo(double _dxo) {
	dxo = _dxo;
}

vect3 force_m::forcex(ball b) {
	double m = b.m;
	double x = b.r0.x;
	double gg = 0;
	if(x < xn) {
		gg = 0;
	} else if(xn < x && x < xo - dxo) {
		gg = -g;
	} else if(-dxo < x < dxo) {
		gg = 0;
	} else if(xo + dxo < x && x < xp) {
		gg = g;
	} else {
		gg = 0;
	}
	return dir * m * gg;
}

void test_force_mx(void) {
	cout << "Testing class test_force_mx()" << endl;
	
	// Gravitation force
	force_m fm;
	fm.setdxo(1E-6);
	fm.g = 1;
	fm.dir = vect3(1, 0, 0);
	fm.xn = -1;
	fm.xo = 0;
	fm.xp = 1;
	
	// A ball
	ball b;
	b.m = 1;
	
	// Gravitation field parameters
	double xmin = -2;
	double xmax = 2;
	double dx = 0.1;
	double x = xmin;
	
	// Iteration for checking g(x)
	int N = (int)((xmax - xmin) / dx);
	for(int iN = 0; iN <= N; iN++) {
		b.r0.x = x;
		double fx = fm.forcex(b).x;
		cout << x << '\t';
		cout << fx << endl;
		x = x + dx;
	}
}

#endif
