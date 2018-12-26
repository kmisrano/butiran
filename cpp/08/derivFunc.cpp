/*
	derivFunc.cpp
	Derivative of a function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ derivFunc.cpp -o derivFunc
	Execute: ./derivFunc
	
	20181226
	Start this program at Gambar station in Jakarta.
*/

#include <cmath>
#include <iostream>
#include <sstream>
#include <cstring>
#include <vector>

double f(double);

using namespace std;

int main(int argc, char *argv[]) {
	
	return 0;
}

// Function f(x) = (x - x1) * (x - x2)
double f(double x) {
	double x1 = 3;
	double x2 = 5;
	double y = (x - x1) * (x - x2);
	return y;
}
