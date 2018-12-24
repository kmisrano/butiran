/*
	vectorMinMax.cpp
	Set min and max to the beginning and end of a vector
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ vectorMinMax.cpp -o vectorMinMax
	Execute: ./vectorMinMax
	
	20181224
	Start this program at home in Bogor.
*/

#include <iostream>
#include <vector>

using namespace std;

void disp(vector<int>);

int main(int argc, char *argv[]) {
	vector<int> num = {5, 3, 6, 7, 2, 4};
	int src, dest;
	
	cout << "orignal is ";
	disp(num);
	cout << endl;
	
	int N = num.size();
	int min = num[0];
	int iMin = 0;
	int max = num[0];
	int iMax = 0;
	for(int i = 1; i < N; i++) {
		if(num[i] < min) {
			iMin = i;
			min = num[i];
		}
		if(num[i] > max) {
			iMax = i;
			max = num[i];
		}
	}
	
	swap(num[0], num[iMin]);
	swap(num[N - 1], num[iMax]);
	
	cout << "min max is ";
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
