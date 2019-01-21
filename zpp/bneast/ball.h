/*
	ball.h
	Library for ball structure
	
	Sparisoma Viridi | dudung@gmail.com
	
	20160403
	Create this library.
*/

#include <cstring>
#include <sstream>
#include "vect3.h"

using namespace std;

#ifndef BALL_H
#define BALL_H

struct ball {
	string label;
	int id;
	double m;
	double d;
	double q;
	vect3 r;
	vect3 v;
	vect3 a;
	ball(void);
	ball(string, int);
	~ball(void);
	string strval(void);
	void setmdq(double, double, double);
	void setrva(vect3, vect3, vect3);
};

// Define default constructor
ball::ball(void) {
	label = "BALL";
	id = 0;
	m = 0;
	d = 0;
	q = 0;
	r = vect3();
	v = vect3();
	a = vect3();
}

// Define constructor with label and id
ball::ball(string l, int i) {	
	label = l;
	id = i;
	m = 0;
	d = 0;
	q = 0;
	r = vect3();
	v = vect3();
	a = vect3();
}

// Define default destructor
ball::~ball(void) {
	label = "";
	id = 0;
	m = 0;
	d = 0;
	q = 0;
	r = vect3();
	v = vect3();
	a = vect3();
}

// Get values of ball in certain format
string ball::strval(void) {
	stringstream ss;
	ss << "# Ball" << endl;
	ss << "LABEL\t " << label << endl;
	ss << "ID\t " << id << endl;
	ss << "MASS\t " << m << endl;
	ss << "DIAMTR\t " << d << endl;
	ss << "CHARGE\t " << q << endl;
	ss << "POST3D\t " << r.strval() << endl;
	ss << "VELO3D\t " << v.strval() << endl;
	ss << "ACCL3D\t " << a.strval();
	return ss.str();
}

// Set value of mass, diameter, charge
void ball::setmdq(double mm, double dd, double qq) {
	m = mm;
	d = dd;
	q = qq;
}

// Set value of position, velocity, acceleration
void ball::setrva(vect3 rr, vect3 vv, vect3 aa) {
	r = rr;
	v = vv;
	a = aa;
}

#endif
