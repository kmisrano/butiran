/*
	simpstats.js
	Some simple statistics function
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ simpstats.cpp -o simpstats
	Execute: ./simpstats
	
	20190128
	1953 Derive from simpstats.js at home.	
*/

#include <iostream>
#include <sstream>
#include <vector>
#include <cstring>

using namespace std;

string strval(vector<double>);

int main(int argc, char *argv[]) {
	vector<double> x = {2, 3, 5, 2, 9, 7, 2, 8, 2, 1};
	
	cout << "x = " << strval(x) << endl;
	
	return 0;
}

// String representation of an array
string strval(vector<double> x) {
	ostringstream sout;
	int N = x.size();
	for(int i = 0; i < N; i++) {
		sout << x[i];
		if(i < N - 1) {
			sout << ", ";
		}
	}
	return sout.str();
}