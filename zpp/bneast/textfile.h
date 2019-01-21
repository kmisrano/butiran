/*
	textfile.h
	Some functions related to reading a text file.
	
	Sparisoma Viridi | dudung@gmail.com
	
	20160426
	Add functions:
	bool iscommentline(string, string),
	bool isemptyline(string),
	int dataline(const char*),
	void getdatacols1(const char*, double*),
	void getdatacols2(const char*, double*, double*),
	void getdatacols3(const char*, vect3).
	20160427
	Create function void datafcol(const char*, int, double[])
	for substituting previous getdatacolsn functions.
	Create also for multiple column to vect3 structure.
*/

#include <cstring>
#include <fstream>
#include <sstream>

#include "vect3.h"

using namespace std;

#ifndef TEXTFILE_H
#define TEXTFILE_H

// Define functions
bool iscommentline(string, string);
bool isemptyline(string);
int dataline(const char*);
void getdatacols1(const char*, double[]);
void getdatacols2(const char*, double[], double[]);
void getdatacols3(const char*, vect3[]);
void datafcol(const char*, int, double[]);
void datafcoln(const char*, int, vect3[]);

// Determine whether a line is a comment line
bool iscommentline(string line, string pattern) {
	bool icl = true;
	if(line.find(pattern) == string::npos) {
		icl = false;
	}
	return icl;
}

// Define whether a line is an empty line
bool isemptyline(string line) {
	bool iel = true;
	if(!line.empty()) {
		iel = false;
	}
	return iel;
}

// Get data line
int dataline(const char *ifn) {
	ifstream fin;
	fin.open(ifn);
	int N = 0;
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT_LINE = iscommentline(line, "#");
		bool EMPTY_LINE = isemptyline(line);
		if(!COMMENT_LINE && !EMPTY_LINE)
			N++;
		}
	fin.close();
	return N;
}

// Get data from one column
void getdatacols1(const char *ifn, double x[]) {
	ifstream fin;
	fin.open(ifn);
	int i = 0;
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT_LINE = iscommentline(line, "#");
		bool EMPTY_LINE = isemptyline(line);
		if(!COMMENT_LINE && !EMPTY_LINE) {
			stringstream ss;
			ss << line;
			ss >> x[i];
			i++;
		}
	}
	fin.close();
}

// Get data from two columns
void getdatacols2(const char *ifn, double x[], double y[]) {
	ifstream fin;
	fin.open(ifn);
	int i = 0;
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT_LINE = iscommentline(line, "#");
		bool EMPTY_LINE = isemptyline(line);
		if(!COMMENT_LINE && !EMPTY_LINE) {
			stringstream ss;
			ss << line;
			ss >> x[i];
			ss >> y[i];
			i++;
		}
	}
	fin.close();
}

// Get data from three columns
void getdatacols3(const char* ifn, vect3 r[]) {
	ifstream fin;
	fin.open(ifn);
	int i = 0;
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT_LINE = iscommentline(line, "#");
		bool EMPTY_LINE = isemptyline(line);
		if(!COMMENT_LINE && !EMPTY_LINE) {
			stringstream ss;
			ss << line;
			ss >> r[i].x;
			ss >> r[i].y;
			ss >> r[i].z;
			i++;
		}
	}
	fin.close();
}

// Get data from file at column
void datafcol(const char *ifn, int col, double x[]) {
	ifstream fin;
	fin.open(ifn);
	int i = 0;
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT_LINE = iscommentline(line, "#");
		bool EMPTY_LINE = isemptyline(line);
		if(!COMMENT_LINE && !EMPTY_LINE) {
			stringstream ss;
			ss << line;
			double xx = 0;
			for(int j = 0; j <= col; j++) {
				ss >> xx;
			}
			x[i] = xx;
			i++;
		}
	}
	fin.close();
}

// Get data from file at columns
void datafcol(const char *ifn, int col, vect3 r[]) {
	ifstream fin;
	fin.open(ifn);
	int i = 0;
	while(fin.good()) {
		string line;
		getline(fin, line);
		bool COMMENT_LINE = iscommentline(line, "#");
		bool EMPTY_LINE = isemptyline(line);
		if(!COMMENT_LINE && !EMPTY_LINE) {
			stringstream ss;
			ss << line;
			double xx = 0;
			for(int j = 0; j <= col; j++) {
				ss >> xx;
			}
			r[i].x = xx;
			ss >> r[i].y;
			ss >> r[i].z;
			i++;
		}
	}
	fin.close();
}

#endif
