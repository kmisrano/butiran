/*
	force_n-gen.cpp
	Generates parameters for normal force
	Sparisoma Viridi
	20120310
	Compile: g++ force_n-gen.cpp -o force_n-gen
	Run: ./force_n-gen kn gm output
*/

#include <iostream>
#include <sstream>
#include <cstdlib>
#include "rwparams.h"

using namespace std;

int main(int argc, char **argv) {
	if(argc < 4) {
		cout << "Usage: ./force_n-gen kn gn output" << endl;
		cout << "kn\tspring constant" << endl;
		cout << "gn\tdamping constant" << endl;
		cout << "output\tconfiguration-file" << endl;
		return 0;
	}
	
	double kn = atof(argv[1]);
	double gn = atof(argv[2]);
	const char *ofn = argv[3];
	
	writecomment(ofn, "# Normal force constants");
	writeparam(ofn, "KN", kn);
	writeparam(ofn, "GN", gn);
	writenewline(ofn);
	
	stringstream args;
	for(int i = 0; i < argc; i++) {
		args << argv[i];
		if(i < argc - 1) args <<  " ";
	}
	cout << args.str() << endl;
	
	return 0;
}
