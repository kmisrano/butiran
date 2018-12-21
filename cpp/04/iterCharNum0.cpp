/*
	iterCharNum.cpp
	Example of nested iteration with for
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ iterCharNum.cpp -o iterCharNum
	Execute: ./iterCharNum
	
	20181221
	Start this program.
*/

#include <iostream>
#include <cstdlib>

using namespace std;

int main(int argc, char *argv[]) {
	if(argc < 3) {
		cout << "Usage: iterCharNum [n char]" << endl;
		cout << "n\tnumber of lines" << endl;
		cout << "char\tcharacter to be displayed" << endl;
		return -1;
	}
	
	int N = atoi(argv[1]);
	char *ch = argv[2];
	for(int i = 1; i <= N; i++) {
		int M = i;
		for(int j = 1; j <= M; j++) {
			cout << ch;
		}
		cout << endl;
	}
	
	return 0;
}
