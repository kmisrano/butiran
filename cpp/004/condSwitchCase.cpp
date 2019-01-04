/*
	condSwitchCase.cpp
	Example of condition using switch case
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ condSwitchCase.cpp -o condSwitchCase
	Execute: ./condSwitchCase
	
	20181220
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	if(argc < 2) {
		cout << "Usage: condSwitchCase [n]" << endl;
		return -1;
	}
	
	int n = atoi(argv[1]);
	
	switch(n) {
	case 0: cout << "nol" << endl; break;
	case 1: cout << "satu" << endl; break;
	case 2: cout << "dua" << endl; break;
	case 3: cout << "tiga" << endl; break;
	case 4: cout << "empat" << endl; break;
	case 5: cout << "lima" << endl; break;
	case 6: cout << "enam" << endl; break;
	case 7: cout << "tujuh" << endl; break;
	case 8: cout << "delapan" << endl; break;
	case 9: cout << "sembilan" << endl; break;
	default: cout << "bukan 0-9" << endl; break;
	}
	
	return 0;
}
