/*
	gearpc.h
	Sparisoma Viridi
	20090124, 20090302, 20090329, 20090520
	Gear Predictor-Corrector class
*/

#include <math.h>
#include "vect3.h"
#include "point.h"
#include "ball.h"

#include <string>
#include <sstream>

using namespace std;

#ifndef gearpc_h
#define gearpc_h

class gearpc {
private:
	double c0, c1, c2, c3, c4, c5;
	int m00, m01, m02, m03, m04, m05;
	int m10, m11, m12, m13, m14, m15;
	int m20, m21, m22, m23, m24, m25;
	int m30, m31, m32, m33, m34, m35;
	int m40, m41, m42, m43, m44, m45;
	int m50, m51, m52, m53, m54, m55;
	double k0, k1, k2, k3, k4, k5;
	double dt;
	vect3 r0, r1, r2, r3, r4, r5;
	double ct0, ct1, ct2, ct3, ct4, ct5;
	public:
	gearpc(void);
	~gearpc(void);
	double getvalc(int);
	int getvalm(int, int);
	double getvalk(int);
	double getr(int, double, double);
	void setdt(double);
	double getdt(void);
	void push(vect3, vect3, vect3, vect3, vect3, vect3);
	void push(point);
	void push(ball);
	void predict(void);
	void correct(vect3);
	void pop(vect3&, vect3&, vect3&, vect3&, vect3&, vect3&);
	void pop(point &p);
	void pop(ball &b);
};

void gearpc::correct(vect3 rr2) {
	vect3 rc2 = k2 * ct2 * rr2;
	vect3 dr2 = rc2 - r2;
	r0 = r0 + c0 * dr2;
	r1 = r1 + c1 * dr2;
	r2 = r2 + c2 * dr2;
	r3 = r3 + c3 * dr2;
	r4 = r4 + c4 * dr2;
	r5 = r5 + c5 * dr2;
}

void gearpc::setdt(double ddt) {
	dt = ddt;
	ct0 = 1;
	ct1 = 1 * dt;
	ct2 = 1 * dt * dt;
	ct3 = 1 * dt * dt * dt;
	ct4 = 1 * dt * dt * dt * dt;
	ct5 = 1 * dt * dt * dt * dt * dt;
}

double gearpc::getdt(void) {
	return dt;
}

void gearpc::push(
	vect3 rr0, vect3 rr1, vect3 rr2,
	vect3 rr3, vect3 rr4, vect3 rr5
) {
	r0 = k0 * ct0 * rr0;
	r1 = k1 * ct1 * rr1;
	r2 = k2 * ct2 * rr2;
	r3 = k3 * ct3 * rr3;
	r4 = k4 * ct4 * rr4;
	r5 = k5 * ct5 * rr5;
}

void gearpc::push(point p) {
	push(p.r0, p.r1, p.r2, p.r3, p.r4, p.r5);
}

void gearpc::push(ball b) {
	push(b.r0, b.r1, b.r2, b.r3, b.r4, b.r5);
}

void gearpc::pop(
	vect3 &rr0, vect3 &rr1, vect3 &rr2,
	vect3 &rr3, vect3 &rr4, vect3 &rr5
) {
	 rr0 = r0 / k0 / ct0;
	 rr1 = r1 / k1 / ct1;
	 rr2 = r2 / k2 / ct2;
	 rr3 = r3 / k3 / ct3;
	 rr4 = r4 / k4 / ct4;
	 rr5 = r5 / k5 / ct5;
}

void gearpc::pop(point &p) {
	pop(p.r0, p.r1, p.r2, p.r3, p.r4, p.r5);
}

void gearpc::pop(ball &b) {
	pop(b.r0, b.r1, b.r2, b.r3, b.r4, b.r5);
}

void gearpc::predict() {
	vect3 rp0, rp1, rp2, rp3, rp4, rp5;
	
	rp0 = m00*r0 + m01*r1 + m02*r2 + m03*r3 + m04*r4 + m05*r5;
	rp1 = m10*r0 + m11*r1 + m12*r2 + m13*r3 + m14*r4 + m15*r5;
	rp2 = m20*r0 + m21*r1 + m22*r2 + m23*r3 + m24*r4 + m25*r5;
	rp3 = m30*r0 + m31*r1 + m32*r2 + m33*r3 + m34*r4 + m35*r5;
	rp4 = m40*r0 + m41*r1 + m42*r2 + m43*r3 + m44*r4 + m45*r5;
	rp5 = m50*r0 + m51*r1 + m52*r2 + m53*r3 + m54*r4 + m55*r5;
	
	r0 = rp0;
	r1 = rp1;
	r2 = rp2;
	r3 = rp3;
	r4 = rp4;
	r5 = rp5;
}

gearpc::gearpc(void) {
	//Coeffients of 6 values 2nd order equation
	//Gear Predictor-Corrector algorithm
	c0 = 3.00E0 / 1.60E1;
	c1 = 2.51E2 / 3.60E2;
	c2 = 1.00E0 / 1.00E0;
	c3 = 1.10E1 / 1.80E1;
	c4 = 1.00E0 / 6.00E0;
	c5 = 1.00E0 / 6.00E1;
	//The matrix
	m00 = 1; m01 = 1; m02 = 1; m03 = 1; m04 = 1; m05 = 1;
	m10 = 0; m11 = 1; m12 = 2; m13 = 3; m14 = 4; m15 = 5;
	m20 = 0; m21 = 0; m22 = 1; m23 = 3; m24 = 6; m25 = 10;
	m30 = 0; m31 = 0; m32 = 0; m33 = 1; m34 = 4; m35 = 10;
	m40 = 0; m41 = 0; m42 = 0; m43 = 0; m44 = 1; m45 = 5;
	m50 = 0; m51 = 0; m52 = 0; m53 = 0; m54 = 0; m55 = 1;
	//Scaled time derivatives coefficients
	k0 = 1.0/1; k1 = 1.0/1; k2 = 1.0/2;
	k3 = 1.0/6; k4 = 1.0/24; k5 = 1.0/120;
	//Temporary r0, r1, r2, r3, r4, r5
	r0 = vect3(0, 0, 0);
	r1 = vect3(0, 0, 0);
	r2 = vect3(0, 0, 0);
	r3 = vect3(0, 0, 0);
	r4 = vect3(0, 0, 0);
	r5 = vect3(0, 0, 0);
	//Time discretization: default in ps
	dt = 1E-12;
	//Multiplication of dt
	ct0 = 1;
	ct1 = 1 * dt;
	ct2 = 1 * dt * dt;
	ct3 = 1 * dt * dt * dt;
	ct4 = 1 * dt * dt * dt * dt;
	ct5 = 1 * dt * dt * dt * dt * dt;
}

gearpc::~gearpc(void) {
}

double gearpc::getvalc(int n) {
	double temp = -1.00E0;
	switch(n) {
		case 0: temp = c0; break;
		case 1: temp = c1; break;
		case 2: temp = c2; break;
		case 3: temp = c3; break;
		case 4: temp = c4; break;
		case 5: temp = c5; break;
	}
	return temp;
}

int gearpc::getvalm(int i, int j) {
	int temp = -1;
	switch(i) {
		case 0:
			switch(j) {
				case 0: temp = m00; break;
				case 1: temp = m01; break;
				case 2: temp = m02; break;
				case 3: temp = m03; break;
				case 4: temp = m04; break;
				case 5: temp = m05; break;
			} break;
		case 1:
			switch(j) {
				case 0: temp = m10; break;
				case 1: temp = m11; break;
				case 2: temp = m12; break;
				case 3: temp = m13; break;
				case 4: temp = m14; break;
				case 5: temp = m15; break;
			} break;
		case 2:
			switch(j) {
				case 0: temp = m20; break;
				case 1: temp = m21; break;
				case 2: temp = m22; break;
				case 3: temp = m23; break;
				case 4: temp = m24; break;
				case 5: temp = m25; break;
			} break;
		case 3:
			switch(j) {
				case 0: temp = m30; break;
				case 1: temp = m31; break;
				case 2: temp = m32; break;
				case 3: temp = m33; break;
				case 4: temp = m34; break;
				case 5: temp = m35; break;
			} break;
		case 4:
			switch(j) {
				case 0: temp = m40; break;
				case 1: temp = m41; break;
				case 2: temp = m42; break;
				case 3: temp = m43; break;
				case 4: temp = m44; break;
				case 5: temp = m45; break;
			} break;
		case 5:
			switch(j) {
				case 0: temp = m50; break;
				case 1: temp = m51; break;
				case 2: temp = m52; break;
				case 3: temp = m53; break;
				case 4: temp = m54; break;
				case 5: temp = m55; break;
			} break;
	}
}

double gearpc::getvalk(int n) {
	double temp = -1.00E0;
	switch(n) {
		case 0: temp = k0; break;
		case 1: temp = k1; break;
		case 2: temp = k2; break;
		case 3: temp = k3; break;
		case 4: temp = k4; break;
		case 5: temp = k5; break;
	}
	return temp;
}

double gearpc::getr(int n, double r, double dt) {
	double temp = -1.0;
	double ct = 1.0 / dt;
	for(int i = 0; i <= n; i++) ct = ct * dt;
	switch(n) {
		case 0: temp = k0 * r * ct; break;
		case 1: temp = k1 * r * ct; break;
		case 2: temp = k2 * r * ct; break;
		case 3: temp = k3 * r * ct; break;
		case 4: temp = k4 * r * ct; break;
		case 5: temp = k5 * r * ct; break;
	}
	return(temp);
}

#endif
