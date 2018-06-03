/*
	fixwnum-gen.cpp
	Generate fixed width number for files
	Sparisoma Viridi, (CC 2012) CC:BY-SA-NC
	derived from drude-gen.cpp
	20120118
	Compile: g++ fixwnum-gen.cpp -o fixwnum-gen
	Run: ./fixwnum-gen N i
*/

#include <iostream>
#include <sstream>
#include <cstdlib>
#include <math.h>


using namespace std;

int main(int argc, char **argv) {
	// How to run this code
	if(argc < 3) {
		cout << "Usage: ./fixwnum-gen N i" << endl;
		cout << "N\tmaximum number" << endl;
		cout << "i\tcurrent number" << endl;
		return 0;
	}
	
	int N = atoi(argv[1]);
	int i = atoi(argv[2]);
	
	int lw = (int) ceil(log10(N + 1));
	
	stringstream s;
	s.width(lw);
	s.fill('0');
	s << i;
	char c[lw];
	s >> c;
	
	cout << c;
	
	return 0;
}

