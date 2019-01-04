/*
	incdec.h
	Example of defining header file
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Usage: #include "incdec.h"
	
	20181219
	Start this header file.
*/

#ifndef butiran_incdec_h
#define butiran_incdec_h

// Declare functions name
void inc(int&);
void inc(int&, int);
void dec(int&);
void dec(int&, int);

// Increase by 1
void inc(int &i) {
	i++;
}

// Increase by n
void inc(int &i, int n) {
	i += n;
}

// Decrease by 1
void dec(int &i) {
	i--;
}

// Decrease by n
void dec(int &i, int n) {
	i -= n;
}

#endif
