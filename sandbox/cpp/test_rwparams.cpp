/*
	test_rwparams.h
	Sparisoma Viridi | dudung@gmail.com
	Use of rwparams.h
	20150304 Make this code
			 Fix bug of random value in rwparams.h
*/

#include <iostream>
#include "rwparams.h"

using namespace std;

int main(int argc, char *argv[]) {
	if(argc < 2) {
		cout << "Usage: test_rwparams [paramf]" << endl;
		cout << "paramf\tparameter file" << endl;
		exit(1);
	}
	
	const char *paramf = argv[1];
	
	cout << "Initial values" << endl;
	double c0 = 0.0;
	double c1 = 0.0;
	double c2 = 0.0;
	double c3 = 0.0;
	
	cout << "c0 = " << c0 << endl;
	cout << "c1 = " << c1 << endl;
	cout << "c2 = " << c2 << endl;
	cout << "c3 = " << c3 << endl;
	
	cout << endl;
	
	readparam(paramf, "C0", c0);
	readparam(paramf, "C1", c1);
	readparam(paramf, "C2", c2);
	readparam(paramf, "C3", c3);
	
	cout << "Values read from " << paramf << endl;
	cout << "c0 = " << c0 << endl;
	cout << "c1 = " << c1 << endl;
	cout << "c2 = " << c2 << endl;
	cout << "c3 = " << c3 << endl;
	
	return 0;
}
