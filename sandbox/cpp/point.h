/*
	point.h
	Sparisoma Viridi
	20080226, 20081120, 20090329
	Point mass particle class
*/

#ifndef point_h
#define point_h

#ifndef vect3_h
#include "vect3.h"
#endif

struct point {
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
	double q;
};

#endif
