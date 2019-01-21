/*
	force_s.h
	Sparisoma Viridi
	20120324
	Normal spin force between two objects
	Note:
		Derived from force_s.h
		20090516, 20090520, 20110605
*/

#ifndef force_s_h
#define force_s_h

#ifndef vect3_h
#include "vect3.h"
#endif

#ifndef ball_h
#include "ball.h"
#endif

class force_s {
public:
	vect3 e_n;
	double k_n;
	double k_s;
	double gamma_n;
	force_s(void);
	force_s(double, double, double);
	~force_s(void);
	vect3 force(ball, ball);
};

force_s::force_s(void) {
	e_n = vect3(0, 0, 0);
	k_n = 0;
	k_s = 0;
	gamma_n = 0;	
}

force_s::force_s(double _k_n, double _k_s, double _gamma_n) {
	e_n = vect3(0, 0, 0);
	k_n = _k_n;
	k_s = _k_s;
	gamma_n = _gamma_n;
}

force_s::~force_s(void) {
	e_n = vect3(0, 0, 0);
}

vect3 force_s::force(ball b1, ball b2) {
	vect3 r1 = b1.r0;
	vect3 r2 = b2.r0;
	double R1 = 0.5 * b1.d;
	double R2 = 0.5 * b2.d;
	double s1 = b1.s;
	double s2 = b2.s;
	vect3 r12 = r1 - r2;
	double R12 = r12.len();
	double s12 = k_s * s1 * s2;
	double d = (R1 + R2) - R12 - s12;
	double xi = (d > 0) ? d : 0;
	vect3 e_n = r12 >> 1;
	vect3 v1 = b1.r1;
	vect3 v2 = b2.r1;
	vect3 v12 = v1 - v2;
	vect3 e_m = v12 >> 1;
	double xi_dot = (d > 0) ? v12.len() : 0;
	double f_n = k_n * xi;
	double g_n = gamma_n * xi_dot;
	return f_n * e_n - g_n * e_m;
}


#endif
