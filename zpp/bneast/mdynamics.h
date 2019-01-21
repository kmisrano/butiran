/*
	mdynamics.h
	Library for 3-d molecular dynamics method
	
	Sparisoma Viridi | dudung@gmail.com
	
	20160403
	Create this library.
*/

#ifndef MDYNAMICS_H
#define MDYNAMICS_H

void intEuler(vect3&, vect3&, vect3, double);
void intVerlet(vect3&, vect3&, vect3, double);

// Calculate numerical integration with Euler algorithm
void intEuler(vect3& r, vect3& v, vect3 a, double dt) {
	v = v + a * dt;
	r = r + v * dt;
}

// Calculate numerical integration with Verlet algorithm
void intVerlet(vect3& r, vect3& v, vect3 a, double dt) {
	r = r + v * dt + 0.5 * a * dt * dt;
	v = v + a * dt;
}

#endif
