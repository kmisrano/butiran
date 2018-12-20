/*
	condIfElseNestedNot.cpp
	Example of condition using nested if else modified
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ condIfElseNestedNot.cpp -o condIfElseNestedNot
	Execute: ./condIfElseNestedNot
	
	20181220
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	if(argc < 3) {
		cout << "Usage: ./condIfElseNestedNot [cond1 cond2]" << endl;
		cout << "cond1\t1 lapar, 0 tidak lapar" << endl;
		cout << "cond2\t1 punya uang, 0 tidak beruang" << endl;
		
		return 1;
	}

	bool perutLapar = atoi(argv[1]);
	bool punyaUang = atoi(argv[2]);
	
	if(perutLapar && punyaUang) {
		cout << "Beli makananan berat" << endl;
	} else if(perutLapar && !punyaUang) {
		cout << "Minta makanan ke teman" << endl;
	} else if(!perutLapar && punyaUang){
		cout << "Jajan cemilan" << endl;
	} else {
		cout << "Menahan lapar" << endl;
	}
	
	return 0;
}
