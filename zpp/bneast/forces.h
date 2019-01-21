/*
	forces.h
	Library for 3-d interaction forces
	
	Sparisoma Viridi | dudung@gmail.com
	
	20160403
	Create this library.
*/

#include <cmath>

#include "vect3.h"
#include "ball.h"

#ifndef FORCES_H
#define FORCES_H

// Define some types of interaction force
vect3 fG(ball, vect3);
vect3 fG(ball, double, vect3);
vect3 fG(ball, ball, double);
vect3 fE(ball, vect3);
vect3 fE(ball, double, vect3);
vect3 fE(ball, ball, double);
vect3 fS(ball, double, vect3);
vect3 fN(ball, ball, double, double);

// Calculate gravitation force in gravitation field g
vect3 fG(ball b, vect3 g) {
	double m = b.m;
	vect3 f = m * g;
	return f;
}

// Calculate gravitation force in gravitation field g
// from a point rc
vect3 fG(ball b, double g, vect3 rc) {
	double m = b.m;
	vect3 r = b.r;
	vect3 n = (r - rc) >> 1;
	vect3 f = -m * g * n;
	return f;
}

// Calculate gravitation force between two balls
// with gravitation constant G
vect3 fG(ball b1, ball b2, double kG) {
	vect3 r1 = b1.r;
	vect3 r2 = b2.r;
	double m1 = b1.m;
	double m2 = b2.m;
	vect3 r12 = r1 - r2;
	vect3 n12 = r12 >> 1;
	double l12 = r12.length();
	vect3 f = -kG * ((m1 * m2) / (l12 * l12)) * n12;
	return f;
}

// Calculate electric force in electric field E
vect3 fE(ball b, vect3 E) {
	double q = b.q;
	vect3 f = q * E;
	return f;
}

// Calculate electric force in electric field E
// from a point rc
vect3 fE(ball b, double E, vect3 rc) {
	double q = b.q;
	vect3 r = b.r;
	vect3 n = (r - rc) >> 1;
	vect3 f = -q * E * n;
	return f;
}

// Calculate electric force between two balls
// with electrostatik constant kE
vect3 fE(ball b1, ball b2, double kE) {
	vect3 r1 = b1.r;
	vect3 r2 = b2.r;
	double q1 = b1.q;
	double q2 = b2.q;
	vect3 r12 = r1 - r2;
	vect3 n12 = r12 >> 1;
	double l12 = r12.length();
	vect3 f = kE * ((q1 * q2) / (l12 * l12)) * n12;
	return f;
}

// Calculate spring force with spring constant kS
// from a point rc
vect3 fS(ball b, double kS, vect3 rc) {
	vect3 r = b.r;
	vect3 f = -kS * (r - rc);
	return f;
}

// Calculate normal force between two balls with
// constants kN and gN
vect3 fN(ball b1, ball b2, double kN, double gN) {
	double d1 = b1.d;
	double d2 = b2.d;
	vect3 r1 = b1.r;
	vect3 r2 = b2.r;
	vect3 v1 = b1.v;
	vect3 v2 = b2.v;
	vect3 r12 = r1 - r2;
	vect3 n12 = r12 >> 1;
	double l12 = r12.length();
	double xi12 = max(0.0, 0.5 * (d1 + d2) - l12);
	vect3 v12 = v1 - v2;
	double s12 = v12.length();
	double xidot12 = -s12;
	vect3 f = (kN * xi12 - gN * xidot12) * n12;
	return f;
}

#endif
