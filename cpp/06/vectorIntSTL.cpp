/*
	vectorIntSTL.cpp
	Container of vector of int in STL
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ vectorIntSTL.cpp -o vectorIntSTL
	Execute: ./vectorIntSTL
	
	20181223
	Start this program at home in Bogor.
*/

#include <iostream>
#include <vector>

using namespace std;

size_t getSize(vector<int>);

int main(int argc, char *argv[]) {
	vector<int> x = {2, 3, 5, 7, 11, 13};
	
	size_t size = x.size();
	int sbytes = sizeof(x);
	
	cout << "size of x is " << size << " elements" << endl;
	cout << "size of x is " << sbytes << " bytes" << endl;
	cout << "size of x (function) is " << getSize(x);
	cout << " elements" << endl;
	
	return 0;
}

size_t getSize(vector<int> num) {
	size_t s = num.size();
	return s;
}
