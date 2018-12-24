/*
	sortBubble.cpp
	Bubble sort
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ sortBubble.cpp -o sortBubble
	Execute: ./sortBubble
	
	20181224
	Start this program at home in Bogor.
*/

#include <iostream>
#include <vector>

using namespace std;

void disp(vector<int>);

int main(int argc, char *argv[]) {
	vector<int> x = {9, 0, 8, 5, 1};
	
	cout << "orignal: " << endl;
	disp(x);
	cout << endl;
	
	cout << "bubble sort: " << endl;

	int N = x.size();
	for(int i = 0; i < N; i++) {
		for(int j = 0; j < (N - i - 1); j++) {
			cout << j << " " << j + 1 << " | ";
			if(x[j] > x[j + 1]) {
				swap(x[j], x[j + 1]);
			}
			disp(x);
		}
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
