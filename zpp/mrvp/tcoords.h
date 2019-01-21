/*
	tcoords.h
	Sparisoma Viridi
	20120215
	Transforms coordinates
*/

#ifndef tcoords_h
#define tcoords_h

class tcoords {
public:
	double dmin;
	double dmax;
	double rmin;
	double rmax;
	tcoords(void);
	tcoords(double, double, double, double);
	~tcoords(void);
	double dfr(double);
	double rfd(double);
};

tcoords::tcoords(void) {
	dmin = 0;
	dmax = 0;
	rmin = 0;
	rmax = 0;
}

tcoords::tcoords(double a1, double a2, double b1, double b2) {
	dmin = a1;
	dmax = a2;
	rmin = b1;
	rmax = b2;
}

tcoords::~tcoords(void) {
	dmin = 0;
	dmax = 0;
	rmin = 0;
	rmax = 0;
}

double tcoords::dfr(double xr) {
	double xd = (xr - rmin) / (rmax - rmin);
	xd = xd * (dmax - dmin) + dmin;
	return xd;
}

double tcoords::rfd(double xd) {
	double xr = (xd - dmin) / (dmax - dmin);
	xr = xr * (rmax - rmin) + rmin;
	return xr;
}

#endif
