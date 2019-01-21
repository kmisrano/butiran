/*
	force_k.h
	Sparisoma Viridi
	20120112
	Spring force
*/

#ifndef force_k_h
#define force_k_h

#ifndef vect3_h
#include "vect3.h"
#endif

#ifndef ball_h
#include "ball.h"
#endif

class force_k {
public:
	double k_k;
	double l_k;
	force_k(void);
	force_k(double, double);
	~force_k(void);
	vect3 force(ball, ball);
};

force_k::force_k(void) {
	k_k = 0;
	l_k = 0;
}

force_k::force_k(double _k_k, double _l_k) {
	k_k = _k_k;
	l_k = _l_k;
}

force_k::~force_k(void) {
	k_k = 0;
	l_k = 0;
}

vect3 force_k::force(ball b1, ball b2) {
	vect3 r1 = b1.r0;
	vect3 r2 = b2.r0;
	vect3 r12 = r1 - r2;
	vect3 e12 = r12 >> 1;
	double l = r12.len();
	return -k_k * (l - l_k) * e12;
}

#endif
