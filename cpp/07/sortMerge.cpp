/*
	sortBubble.cpp
	Merge sort
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ mergeBubble.cpp -o mergeBubble
	Execute: ./mergeBubble
	
	20181225
	Start this program at home in Bogor.
*/

#include <cmath>
#include <iostream>
#include <vector>

using namespace std;

void disp(vector<int>);
void sort(vector<int>&);
void sort(vector<int>&, int);

int main(int argc, char *argv[]) {
	vector<int> x = {9, 0, 8, 5, 3, 1, 7, 6};
	
	cout << "original:" << endl;
	disp(x);
	cout << endl;
	
	sort(x);
	
	cout << "merge sort:" << endl;
	disp(x);
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

void sort(vector<int> &x) {
	int N = x.size();
	sort(x, N);
}


void sort(vector<int> &x, int N) {
	if(N > 3) {
		sort(x, N / 2);
	} else {
	}
}


/*
void merge(vector<int> &x) {
	disp(x);
}
void merge(vector<int> &x, int M) {
	if(M == 2) {
		int N = x.size() / M;
		for(int i = 0; i < N; i++) {
			if(x[M * i] > x[M * i + 1]) {
				swap(x[M * i], x[M * i + 1]);
			}
		}
	}
}
*/