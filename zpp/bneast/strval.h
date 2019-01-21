/*
	strval.h
	Some functions related to displaying variable content in
	string.
	
	Sparisoma Viridi | dudung@gmail.com
	
	20160426
	Add string strval(double[], int).
	Add string strval(vect3[], int).
*/

#include <cstring>
#include <sstream>

#include "vect3.h"

using namespace std;

#ifndef STRVAL_H
#define STRVAL_H

// Define functions
string strval(double[], int);
string strval(vect3[], int);

// Convert array to string for displaying its content
string strval(double x[], int N) {
	stringstream ss;
	for(int i = 0; i < N; i++) {
		ss << x[i];
		if(i < N - 1) ss << endl;
	}
	string s = ss.str();
	return s;
}

// Convert array to string for displaying its content
string strval(vect3 r[], int N) {
	stringstream ss;
	for(int i = 0; i < N; i++) {
		ss << r[i].x << "\t";
		ss << r[i].y << "\t";
		ss << r[i].z;		
		if(i < N - 1) ss << endl;
	}
	string s = ss.str();
	return s;
}

#endif
