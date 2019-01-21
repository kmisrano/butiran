/*
	vect3.h
	Sparisoma Viridi
	20080225
	3D vector class, operation and manipulation
*/

#include <math.h>

#include <string>
#include <sstream>

using namespace std;

#ifndef vect3_h
#define vect3_h

class vect3 {
public:
	double x;
	double y;
	double z;
	string str(void);
	vect3(void);
	vect3(double, double, double);
	vect3(const vect3&);
	~vect3(void);
	vect3 operator+ (const vect3&);
	vect3 operator- (const vect3&);
	vect3 operator* (const double);
	friend vect3 operator* (const double, const vect3&);
	vect3 operator/ (const double);
	double operator| (const vect3&);
	double len(void);
	vect3 operator>> (const double);
	vect3 operator* (const vect3&);
};

vect3::vect3(void) {
	x = 0;
	y = 0;
	z = 0;
}

vect3::vect3(double vx, double vy, double vz) {
	x = vx;
	y = vy;
	z = vz;
}

vect3::vect3(const vect3& v) {
	x = v.x;
	y = v.y;
	z = v.z;
}

vect3::~vect3(void) {
	x = 0;
	y = 0;
	z = 0;
}

string vect3::str(void) {
	stringstream text(stringstream::in | stringstream::out);
	text << "(" << x;
	text << ", " << y;
	text << ", " << z;
	text << ")";
	return text.str();
}

vect3 vect3::operator+ (const vect3& a) {
	vect3 c;
	c.x = x + a.x;
	c.y = y + a.y;
	c.z = z + a.z;
	return c;
}

vect3 vect3::operator- (const vect3& a) {
	vect3 c;
	c.x = x - a.x;
	c.y = y - a.y;
	c.z = z - a.z;
	return c;
}

vect3 vect3::operator* (const double n) {
	vect3 c;
	c.x = x * n;
	c.y = y * n;
	c.z = z * n;
	return c;
}

vect3 operator* (const double n, const vect3& a) {
	vect3 c;
	c.x = a.x * n;
	c.y = a.y * n;
	c.z = a.z * n;
	return c;
}

vect3 vect3::operator/ (const double n) {
	vect3 c;
	c.x = x / n;
	c.y = y / n;
	c.z = z / n;
	return c;
}

double vect3::operator| (const vect3& a) {
	double d = x * a.x + y * a.y + z * a.z;
	return d;
}

double vect3::len(void) {
	vect3 a(x, y, z);
	vect3 b(x, y, z);
	double d = sqrt(a|b);
	return d;
}

vect3 vect3::operator>> (const double n) {
	vect3 v(x, y, z);
	double l = v.len();
	if(l == 0)
		v = vect3(0, 0, 0);
	else
		v = v / l;
	v = v * n;
	return v;
}

vect3 vect3::operator* (const vect3& a) {
	vect3 c;
	c.x = y * a.z - z * a.y;
	c.y = z * a.x - x * a.z;
	c.z = x * a.y - y * a.x;
	return c;
}

#endif
