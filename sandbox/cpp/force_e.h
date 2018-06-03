/*
	force_e.h
	Sparisoma Viridi
	20120318, 20110605
	Electric force
*/

#ifndef force_e_h
#define force_e_h

#ifndef vect3_h
#include "vect3.h"
#endif

#ifndef ball_h
#include "ball.h"
#endif

class force_e {
public:
	vect3 dir;
	double E;
	force_e(void);
	force_e(vect3, double);
	force_e(double, double, double);
	~force_e(void);
	vect3 force(ball);
};

force_e::force_e(void) {
	dir = vect3(0, 0, 0);
	E = 0;
}

force_e::force_e(vect3 _dir, double _E) {
	dir = _dir;
	E = _E;
}

force_e::force_e(double _Ex, double _Ey, double _Ez) {
	vect3 EE = vect3(_Ex, _Ey, _Ez);
	dir = EE >> 1;
	E = EE.len();
}

force_e::~force_e(void) {
	dir = vect3(0, 0, 0);
	E = 0;
}

vect3 force_e::force(ball b) {
	double q = b.q;
	return dir * q * E;
}

#endif
