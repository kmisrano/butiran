/*
	force_q.h
	Sparisoma Viridi
	20090414, 20110709
	Electrostatic force between two particles
*/

#ifndef force_q_h
#define force_q_h

#ifndef vect3_h
#include "vect3.h"
#endif

#ifndef point_h
#include "point.h"
#endif

class force_q {
public:
	double kQ;
	force_q(void);
	force_q(double);
	~force_q(void);
	vect3 force(point, point);
	vect3 force(ball, ball);
};

force_q::force_q(void) {
	kQ = 1;
}

force_q::force_q(double _kQ) {
	kQ = _kQ;
}

force_q::~force_q(void) {
	kQ = 0;
}

vect3 force_q::force(point p1, point p2) {
	vect3 r1 = p1.r0;
	vect3 r2 = p2.r0;
	vect3 r12 = r1 - r2;
	vect3 n12 = r12 >> 1;
	double R12 = r12.len();
	double q1 = p1.q;
	double q2 = p2.q;
	vect3 f = kQ * ( (q1 * q2) / (R12 * R12) ) * n12;
	return f;
}

vect3 force_q::force(ball b1, ball b2) {
	vect3 r1 = b1.r0;
	vect3 r2 = b2.r0;
	vect3 r12 = r1 - r2;
	vect3 n12 = r12 >> 1;
	double R12 = r12.len();
	double q1 = b1.q;
	double q2 = b2.q;
	vect3 f = kQ * ( (q1 * q2) / (R12 * R12) ) * n12;
	return f;
}

#endif
