/*
	sortInsertion.cpp
	Insertion sort
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ sortInsertion.cpp -o sortInsertion
	Execute: ./sortInsertion
	
	20181224
	Start this program at home in Bogor.
*/

#include <iostream>
#include <vector>

using namespace std;

void disp(vector<int>);

int main(int argc, char *argv[]) {
	vector<int> x = {9, 0, 1, 3, 2, 4, 8, 5, 6, 7};
	
	cout << "orignal: " << endl;
	disp(x);
	cout << endl;
	
	cout << "insertion sort: " << endl;
	
	int N = x.size();
	for(int i = 1; i < N; i++) {
		int ins = x.at(i);
		x.erase(x.begin() + i);
		int k = 0;
		for(int j = i; j >=0; j--) {
			if(ins < x[j]) {
				k = j;
			}
		}
		x.insert(x.begin() + k, ins);
		disp(x);
	}

	return 0;
}

void disp(vector<int> num) {
	int N = num.size();
	for(int i = 0; i < N; i++) {
		cout << num[i] << " ";
	}
	cout << endl;
}
