/*
	force_o.h
	Sparisoma Viridi
	20110604, 20120112
	Oscillator force
	Note: formerly was force_k.h
*/

#ifndef force_o_h
#define force_o_h

#ifndef vect3_h
#include "vect3.h"
#endif

#ifndef ball_h
#include "ball.h"
#endif

class force_o {
public:
	vect3 r_c;
	double k_o;
	force_o(void);
	force_o(vect3, double);
	~force_o(void);
	vect3 force(ball);
};

force_o::force_o(void) {
	r_c = vect3(0, 0, 0);
	k_o = 0;
}

force_o::force_o(vect3 _r_c, double _o_o) {
	r_c = _r_c;
	k_o = _o_o;
}

force_o::~force_o(void) {
	r_c = vect3(0, 0, 0);
	k_o = 0;
}

vect3 force_o::force(ball b) {
	vect3 r = b.r0;
	return -k_o * (r - r_c);
}


#endif
