/*
	rwparams.h
	Library for reading parameters file
	Sparisoma Viridi | dudung@gmail.com
	
	20141120
	Create this class, define first just following
	two functions
	void readparam(const char*, const char*, int&)
	void readparam(const char*, const char*, double&)
	and test them
	
	20150621
	Add function writeparam for integer and double
	Add function writeparam for array of double
	Add function writeparam for comment
	Modify readparam for only two values line, that can
	differ comment line, single value line, two value line
	
	20150920
	Add namespace std, comment header file vect2.h, in order
	to remove error messages.
	
	20151115
	Add function readparam for boolean
	Add function readparam for string
*/

#include <fstream>
#include <sstream>
#include <cstring>
//#include "vect2.h"

#ifndef rwparams_h
#define rwparams_h

using namespace std;

void readparam(const char*, const char*, int&);
void readparam(const char*, const char*, double&);
void writeparam(const char*, const char*, int);
void writeparam(const char*, const char*, double);
void writeparam(const char*, const char*, int, double*);
void writeparam(const char*, const char*);
void readparam(const char*, const char*, bool&);
void readparam(const char*, const char*, string&);

void readparam(const char *pf, const char *pttrn,
	string &x) {
	ifstream fin;
	fin.open(pf);
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT = line.find("#") != string::npos;
		bool BLANK = line.length() == 0;
		bool SINGLE_VALUE = line.find("\t") == string::npos;
		if(!COMMENT && !BLANK && !SINGLE_VALUE) {
			stringstream ss;
			string col1;
			string col2;
			ss << line;
			ss >> col1;
			ss >> col2;
			if(col1 == pttrn) {
				stringstream ss;
				ss << col2;
				ss >> x;
				break;
			}
		}
	}
	fin.close();
}

void readparam(const char *pf, const char *pttrn,
	bool &x) {
	ifstream fin;
	fin.open(pf);
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT = line.find("#") != string::npos;
		bool BLANK = line.length() == 0;
		bool SINGLE_VALUE = line.find("\t") == string::npos;
		if(!COMMENT && !BLANK && !SINGLE_VALUE) {
			stringstream ss;
			string col1;
			string col2;
			ss << line;
			ss >> col1;
			ss >> col2;
			if(col1 == pttrn) {
				stringstream ss;
				ss << col2;
				ss >> x;
				break;
			}
		}
	}
	fin.close();
}

void readparam(const char *pf, const char *pttrn,
	int &x) {
	ifstream fin;
	fin.open(pf);
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT = line.find("#") != string::npos;
		bool BLANK = line.length() == 0;
		bool SINGLE_VALUE = line.find("\t") == string::npos;
		if(!COMMENT && !BLANK && !SINGLE_VALUE) {
			stringstream ss;
			string col1;
			string col2;
			ss << line;
			ss >> col1;
			ss >> col2;
			if(col1 == pttrn) {
				stringstream ss;
				ss << col2;
				ss >> x;
				break;
			}
		}
	}
	fin.close();
}

void readparam(const char *pf, const char *pttrn,
	double &x) {
	ifstream fin;
	fin.open(pf);
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT = line.find("#") != string::npos;
		bool BLANK = line.length() == 0;
		bool SINGLE_VALUE = line.find("\t") == string::npos;
		if(!COMMENT && !BLANK && !SINGLE_VALUE) {
			stringstream ss;
			string col1;
			string col2;
			ss << line;
			ss >> col1;
			ss >> col2;
			if(col1 == pttrn) {
				stringstream ss;
				ss << col2;
				ss >> x;
				break;
			}
		}
	}
	fin.close();
}

void writeparam(const char *pf, const char *pttrn,
	int x) {
	fstream fout;
	fout.open(pf, fstream::out | fstream::app);
	fout << pttrn << "\t";
	fout << x << endl;
	fout.close();
}

void writeparam(const char *pf, const char *pttrn,
	double x) {
	fstream fout;
	fout.open(pf, fstream::out | fstream::app);
	fout << pttrn << "\t";
	fout << x << endl;
	fout.close();
}

void writeparam(const char *pf, const char *pttrn,
	int N, double *x) {
	fstream fout;
	fout.open(pf, fstream::out | fstream::app);
	fout << pttrn << "\t";
	fout << N << endl;
	for(int i = 0; i < N; i++) {
		fout << x[i] << endl;
	}
	fout.close();
}

void writeparam(const char* pf, const char* x) {
	fstream fout;
	fout.open(pf, fstream::out | fstream::app);
	fout << x << endl;
	fout.close();
}

#endif
