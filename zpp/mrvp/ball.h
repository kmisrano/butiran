/*
	ball.h
	Sparisoma Viridi
	20121124
	Simple ball struct
	Version:
		20090520 The first version of ball class is written
		20111022 ball is changed from a class to a struct
		20120310 Member s for spin is added
		20121124 Information of struct member is added
*/

#ifndef ball_h
#define ball_h

#ifndef vect3_h
#include "vect3.h"
#endif

struct ball {
public:
	// n-th derivative of linear position
	vect3 r0, r1, r2, r3, r4, r5;
	// n-th derivative of angular position
	vect3 t0, t1, t2, t3, t4, t5;
	// Mass and diameter
	double m, d;
	// RGB color \in [0, 1] for each component
	vect3 c;
	// Charge and spin
	double q, s;
	// Binding parameter
	double b;
};

#endif
