/*
	force_w.h
	Sparisoma Viridi
	20110605
	Earth gravitational force
*/

#ifndef force_w_h
#define force_w_h

#ifndef vect3_h
#include "vect3.h"
#endif

#ifndef ball_h
#include "ball.h"
#endif

class force_w {
public:
	vect3 dir;
	double g;
	force_w(void);
	force_w(vect3, double);
	~force_w(void);
	vect3 force(ball);
};

force_w::force_w(void) {
	dir = vect3(0, 0, 0);
	g = 0;
}

force_w::force_w(vect3 _dir, double _g) {
	dir = _dir;
	g = _g;
}

force_w::~force_w(void) {
	dir = vect3(0, 0, 0);
	g = 0;
}

vect3 force_w::force(ball b) {
	double m = b.m;
	return dir * m * g;
}

#endif
