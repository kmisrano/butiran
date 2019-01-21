/*
	rwparams.h
	Sparisoma Viridi
	20120318, 20120112, 20120216
	Read and write parameters from and to file
	20120318: change readwriteparams_h to rwparams_h
*/

#include <string.h>
#include <fstream>
#include <sstream>

using namespace std;

#ifndef rwparams_h
#define rwparams_h

/*
	Following notes are taken from sgion.cpp and swgpile.cpp:
	This method is not efficient, especially for a large
	input file, even it works -- 2011.10.22.05.24+07.40132
	
	20120215
	Adding writecomment()
	
	20120216
	Adding readparam() for bool
*/

void readparam(const char *fn, const char *nam, double &val) {
	ifstream fin;
	fin.open(fn);
	char buf[32];
	double temp;
	while(!fin.eof()) {
		fin >> buf;
		if(!strcmp(nam, buf)) {
			fin >> temp;
		}
	}
	fin.close();
	val = temp;
}

void readparam(const char *fn, const char *nam, int &val) {
	ifstream fin;
	fin.open(fn);
	char buf[32];
	int temp;
	while(!fin.eof()) {
		fin >> buf;
		if(!strcmp(nam, buf)) {
			fin >> temp;
		}
	}
	fin.close();
	val = temp;
}

void readparam(const char *fn, const char *nam, bool &val) {
	ifstream fin;
	fin.open(fn);
	char buf[32];
	int temp;
	while(!fin.eof()) {
		fin >> buf;
		if(!strcmp(nam, buf)) {
			fin >> temp;
		}
	}
	fin.close();
	val = temp;
}

/*
	Following codes are added at 2012.01.12
	Note:
	It still has a problem in writing new file: overwrite or
	not? And then how? -- temporary solution: call
	writenewfile(const char* fn) -- 2012.01.12
*/

void writeparam(const char *fn, const char *nam, int val) {
	ofstream fout;
	fout.open(fn, ios::out | ios::app);
	fout << nam << "\t";
	fout << val << endl;
	fout.close();
}

void writeparam(const char *fn, const char *nam, double val) {
	ofstream fout;
	fout.open(fn, ios::out | ios::app);
	fout << nam << "\t";
	fout << val << endl;
	fout.close();
}

void writenewline(const char *fn) {
	ofstream fout;
	fout.open(fn, ios::out | ios::app);
	fout << endl;
	fout.close();
}

// This command must be called to assure that old file is
// overriden
void writenewfile(const char *fn) {
	ofstream fout;
	fout.open(fn);
	fout.close();
}

void writecomment(const char *fn, const char *comment) {
	ofstream fout;
	fout.open(fn, ios::out | ios::app);
	fout << comment << endl;
	fout.close();
}

#endif
