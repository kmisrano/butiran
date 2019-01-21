/*
	cmath2.h
	Some mathematics functions
	
	Sparisoma Viridi | dudung@gmail.com
	
	20160302
	Add double asin2(double) function.
	20160308
	Add double sign(double) function.
*/

#ifndef CMATH2_H
#define CMATH2_H

double asin2(double);
double sign(double);

// Define arc sin function that return values is between
// 0 and 2 M_PI
double asin2(double sint) {
	double asint = asin(sint);
	double ths = (sint < 0) ? 2 * M_PI + asint : asint;
	return ths;
}

// Define sign function for double
double sign(double x) {
	double y = 0;
	if (x > 0) y = +1;
	if (x < 0) y = -1;
	return y;
}

#endif
