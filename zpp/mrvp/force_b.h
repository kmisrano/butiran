/*
	force_b.h
	Sparisoma Viridi
	20121125
	Barrier force
*/

#ifndef force_b_h
#define force_b_h

#ifndef vect3_h
#include "vect3.h"
#endif

#ifndef ball_h
#include "ball.h"
#endif

class force_b {
public:
	vect3 e_n;
	double k_b;
	double r_bmin, r_bmax;
	double r_b0, U_b0;
	force_b(void);
	~force_b(void);
	vect3 force(ball, ball);
};

force_b::force_b(void) {
	e_n = vect3(0, 0, 0);
	k_b = 0;
	r_bmin = 0;
	r_bmax = 0;
	r_b0 = 0;
	U_b0 = 0;
}


force_b::~force_b(void) {
	e_n = vect3(0, 0, 0);
	k_b = 0;
	r_bmin = 0;
	r_bmax = 0;
	r_b0 = 0;
	U_b0 = 0;
}

vect3 force_b::force(ball b1, ball b2) {
	vect3 r1 = b1.r0;
	vect3 r2 = b2.r0;
	vect3 r12 = r1 - r2;
	vect3 e_b = r12 >> 1;
	double d12 = r12.len();
	
	double f_b = 0;
	if((r_bmin < d12) && (d12 < r_bmax)) {
		f_b = k_b * (d12 - r_b0);
	}
	
	return f_b * e_b;
}


#endif
