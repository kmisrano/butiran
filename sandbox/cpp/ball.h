/*
	ball.h
	Sparisoma Viridi
	20120310
	Simple ball class
	Version:
		20090520 The first version of ball class is written
		20111022 ball is changed from a class to a struct
		20120310 Member s for spin is added
*/

#ifndef ball_h
#define ball_h

#ifndef vect3_h
#include "vect3.h"
#endif

struct ball {
public:
	vect3 r0;
	vect3 r1;
	vect3 r2;
	vect3 r3;
	vect3 r4;
	vect3 r5;
	vect3 t0;
	vect3 t1;
	vect3 t2;
	vect3 t3;
	vect3 t4;
	vect3 t5;
	vect3 rc;
	double m;
	double d;
	double q;
	double c;
	double b;
	double s;
};

#endif
