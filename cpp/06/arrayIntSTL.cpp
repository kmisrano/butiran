/*
	arrayIntSTL.cpp
	Container of array of int in STL
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ arrayIntSTL.cpp -o arrayIntSTL
	Execute: ./arrayIntSTL
	
	20181223
	Start this program at home in Bogor.
*/

#include <iostream>
#include <array>

using namespace std;

template<size_t SIZE>
size_t getSize(array<int, SIZE>);

int main(int argc, char *argv[]) {
	const int N = 6;
	array<int, N> x = {2, 3, 5, 7, 11, 13};
	
	size_t size = x.size();
	int sbytes = sizeof(x);
	
	cout << "size of x is " << size << " elements" << endl;
	cout << "size of x is " << sbytes << " bytes" << endl;
	cout << "size of x (function) is " << size;
	cout << " elements" << endl;
	
	return 0;
}

template<size_t SIZE>
size_t getSize(array<int, SIZE> num) {
	size_t s = num.size();
	return s;
}
