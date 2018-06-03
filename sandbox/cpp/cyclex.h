/*
	cyclex.h
	Sparisoma Viridi
	20120318
	Cycle variable in a range
*/

using namespace std;

#ifndef cylclex_h
#define cyclex_h

int cycleid(int idmin, int idmax, int id) {
	int idlength = idmax - idmin;
	if(id >= idmax) {
		while(id >= idmax) {
			id -= idlength;
		}
	} else if (id < idmin) {
		while(id < idmin) {
			id += idlength;
		}
	}
	return id;
}

double cyclerx(double rxmin, double rxmax, double rx) {
	double rxlength = rxmax - rxmin;
	if(rx >= rxmax) {
		while(rx >= rxmax) {
			rx -= rxlength;
		}
	} else if (rx < rxmin) {
		while(rx < rxmin) {
			rx += rxlength;
		}
	}
	return rx;
}

#endif
