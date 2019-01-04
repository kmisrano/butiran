/*
	vectorSwapE.cpp
	Swap two elements in vector
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ vectorSwapE.cpp -o vectorSwapE
	Execute: ./vectorSwapE
	
	20181224
	Start this program at home in Bogor.
*/

#include <iostream>
#include <vector>

using namespace std;

void disp(vector<int>);
void swap(int, int, vector<int>&);
void swapIE(int, int, vector<int>&);

int main(int argc, char *argv[]) {
	vector<int> num = {2, 3, 4, 5, 6, 7};
	int src, dest;
	
	disp(num);
	cout << endl;
	
	src = 1;
	dest = 4;
	swap(src, dest, num);
	cout << "swap position " << src << " with " << dest << endl;
	disp(num);
	cout << endl;
	
	src = 4;
	dest = 3;
	swapIE(src, dest, num);
	cout << "swap position " << src << " with " << dest << endl;
	disp(num);
	cout << endl;
	
	src = 0;
	dest = 5;
	swap(num[src], num[dest]);
	cout << "swap position " << src << " with " << dest << endl;
	disp(num);
	cout << endl;

	return 0;
}

void disp(vector<int> num) {
	int N = num.size();
	for(int i = 0; i < N; i++) {
		cout << num[i] << " ";
	}
	cout << endl;
}

void swap(int isrc, int idest, vector<int> &num) {
	int src = num[isrc];
	int dest = num[idest];
	int temp = src;
	src = dest;
	dest = temp;
	num[isrc] = src;
	num[idest] = dest;
}

void swapIE(int isrc, int idest, vector<int> &num) {
	vector<int>::iterator itsrc = num.begin() + isrc;
	vector<int>::iterator itdest = num.begin() + idest;
	int src = num.at(isrc);
	int dest = num.at(idest);
	num.erase(itsrc);
	num.insert(itsrc, dest);
	num.erase(itdest);
	num.insert(itdest, src);
}
