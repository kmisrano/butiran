/*
	sortSelection.cpp
	Selection sort
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ sortSelection.cpp -o sortSelection
	Execute: ./sortSelection
	
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
	for(int i = 0; i < N; i++) {
		
		int k = 0;
		for(int j = i; j < N; j++) {
			if(ins < x[j]) {
				k = j;
			}
		}
		
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
