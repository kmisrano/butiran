/*
	vect3.h
	Library for 3-d vector structure and operation
	
	Sparisoma Viridi | dudung@gmail.com
	
	20160328
	Create this library.
	20160329
	Continue improving this library. Add comments but not so
	consistently. Only a brief progress.
	20160403
	Change strval from "( , , )" format to tab separated values
	and delete previous version of strval.
*/

#include <cstring>
#include <sstream>
#include <cmath>

using namespace std;

#ifndef VECT3_H
#define VECT3_H

struct vect3 {
	double x, y, z;
	vect3(void);
	vect3(double, double, double);
	vect3(const vect3&);
	~vect3(void);
	string strval(void);
	double length(void);
};

// Define some overloading operators
vect3 operator+(vect3, vect3);
vect3 operator-(vect3, vect3);
vect3 operator*(double, vect3);
vect3 operator*(vect3, double);
vect3 operator*(vect3, vect3);
double operator|(vect3, vect3);
vect3 operator/(vect3, double);
vect3 operator>>(vect3, double);

// Constructor without argument
vect3::vect3(void) {
	x = 0;
	y = 0;
	z = 0;
}

// Constructor with three double arguments
vect3::vect3(double xx, double yy, double zz) {
	x = xx;
	y = yy;
	z = zz;
}

// Constructor with vect3 argument
vect3::vect3(const vect3& r) {
	x = r.x;
	y = r.y;
	z = r.z;
}

// Destructor
vect3::~vect3(void) {
	x = 0;
	y = 0;
	z = 0;
}

// Length of vect3
double vect3::length(void) {
	vect3 v(x, y, z);
	double l2 = (v|v);
	double l = sqrt(l2);
	return l;
}

// Value of vect3 in "x\ty\tz" form
string vect3::strval(void) {
	stringstream ss;
	ss << x << "\t";
	ss << y << "\t";
	ss << z;
	string s = ss.str();
	return s;
}

// Define overloading operator+
vect3 operator+(vect3 r1, vect3 r2) {
	vect3 r3;
	r3.x = r1.x + r2.x;
	r3.y = r1.y + r2.y;
	r3.z = r1.z + r2.z;
	return r3;
}
// Define overloading operator-
vect3 operator-(vect3 r1, vect3 r2) {
	vect3 r3;
	r3.x = r1.x - r2.x;
	r3.y = r1.y - r2.y;
	r3.z = r1.z - r2.z;
	return r3;
}

// Define overloading operator*
vect3 operator*(double s, vect3 v) {
	vect3 r;
	r.x = s * v.x;
	r.y = s * v.y;
	r.z = s * v.z;
	return r;
}

// Define overloading operator*
vect3 operator*(vect3 v, double s) {
	vect3 r;
	r.x = s * v.x;
	r.y = s * v.y;
	r.z = s * v.z;
	return r;
}

// Define cross product operation
vect3 operator*(vect3 r1, vect3 r2) {
	vect3 r;
	r.x = r1.y * r2.z - r1.z * r2.y;
	r.y = r1.z * r2.x - r1.x * r2.z;
	r.z = r1.x * r2.y - r1.y * r2.x;
	return r;
}

// Define dot product operation
double operator|(vect3 r1, vect3 r2) {
	double l2 = r1.x * r2.x;
	l2 += (r1.y * r2.y);
	l2 += (r1.z * r2.z);
	return l2;
}

// Define overloading operator/
vect3 operator/(vect3 v, double s) {
	vect3 r;
	r.x = v.x / s;
	r.y = v.y / s;
	r.z = v.z / s;
	return r;
}

// Set length of a vector
vect3 operator>>(vect3 v, double s) {
	double l = v.length();
	vect3 r = v / l;
	r = r * s;
	return r;
}

#endif
