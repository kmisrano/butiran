/*
	sortMerge.cpp
	Merge sort
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ sortMerge.cpp -o sortMerge
	Execute: ./sortMerge
	
	20181225
	Start this program at home in Bogor.
*/

#include <cmath>
#include <iostream>
#include <sstream>
#include <cstring>
#include <vector>

using namespace std;

string str(vector<int>);
void split(vector<int>&);
void merge(vector<int>&, vector<int>, vector<int>);

int main(int argc, char *argv[]) {
	vector<int> num = {9, 0, 8, 5, 3, 1, 7, 6, 2};
	
	cout << "original:" << endl;
	cout << str(num) << endl;
	cout << endl;
	
	cout << "split:" << endl;
	split(num);
	cout << endl;
	
	cout << "merge sort:" << endl;
	cout << str(num) << endl;
	
	
	/*
	vector<int> n1 = {1, 2, 3};
	vector<int> n2 = {4, 5};
	vector<int> n3;
	merge(n3, n2, n1);
	cout << str(n3) << endl;
	*/
	
	return 0;
}

string str(vector<int> num) {
	int N = num.size();
	stringstream sout;
	for(int i = 0; i < N; i++) {
		sout << num[i];
		if(i < N - 1) sout << " ";
	}
	return sout.str();
}

void split(vector<int> &num) {
	int N = num.size();
	vector<int> lo = {};
	vector<int> hi = {};
		
	if(N > 2) {
		for(int i = 0; i < N; i++) {
			if(i < N / 2) {
				lo.push_back(num[i]);
			} else {
				hi.push_back(num[i]);			
			}
		}
		cout << str(lo) << " -- ";
		cout << str(hi) << endl;
		
		split(lo);
		split(hi);
		
		merge(num, lo, hi);
		cout << "  " << str(num) << endl;
		
	} else {
		// Order the smallest half
		if(N > 1) {
			if(num[0] > num[1]) {
				swap(num[0], num[1]);
			}			
		}
	}
}

void merge(vector<int> &num, vector<int> lo, vector<int> hi) {
	int Nlo = lo.size();
	int Nhi = hi.size();
	int N = Nlo + Nhi;
	num = {};
	
	/*
	// Merge only
	for(int i = 0; i < N; i++) {
		if(i < Nlo) {
			num.push_back(lo.at(0));
			lo.erase(lo.begin());
		} else {
			num.push_back(hi.at(0));
			hi.erase(hi.begin());
		}
	}
	*/
	
	/**/
	// Merge with sort
	for(int i = 0; i < N; i++) {
		if(lo.size() > 0 && hi.size() > 0) {
			if(lo.at(0) < hi.at(0)) {
				num.push_back(lo.at(0));
				lo.erase(lo.begin());
			} else {
				num.push_back(hi.at(0));
				hi.erase(hi.begin());
			}
		} else if(lo.size() > 0) {
			num.push_back(lo.at(0));
			lo.erase(lo.begin());	
		} else {
			num.push_back(hi.at(0));
			hi.erase(hi.begin());
		}		
	}
	/**/
}
