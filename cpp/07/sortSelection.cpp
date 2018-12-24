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
	
	cout << "selection sort: " << endl;
	
	int N = x.size();
	for(int i = 0; i < N; i++) {
		int min = x[i];
		int k = -1;
		for(int j = i + 1; j < N; j++) {
			if(x[j] < min) {
				min = x[j];
				k = j;
			}
		}
		if(k > 0) swap(x[i], x[k]);
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
