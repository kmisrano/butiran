/*
	arrayIntOutSize.cpp
	Access array out of size
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ arrayIntOutSize.cpp -o arrayIntOutSize
	Execute: ./arrayIntOutSize
	
	20181223
	Start this program at home in Bogor.
*/

#include <iostream>

using namespace std;

int main(int argc, char *argv[]) {
	const int N = 6;
	int x[N] = {2, 3, 5, 7, 11, 13};
	for(int i = 0; i < 2 * N; i++) {
		if(i == N) cout << "Out of size!!!" << endl;
		cout << i << " " << x[i] << endl;
	}
	
	return 0;
}
