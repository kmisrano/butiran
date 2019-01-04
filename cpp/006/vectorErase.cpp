/*
	vectorErase.cpp
	Illustration of the use erase() in vector
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ vectorErase.cpp -o vectorErase
	Execute: ./vectorErase
	
	20181224
	Start this program at home in Bogor.
*/

#include <iostream>
#include <vector>

using namespace std;

void disp(vector<int>);

int main(int argc, char *argv[]) {
	vector<int> num = {100, 200, 300, 400, 500};
	vector<int>::iterator pos;
	int offset;
	
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;
	
	offset = 3;
	pos = num.begin() + offset;
	cout << "erase " << num.at(offset) << " at " << offset << endl;
	num.erase(pos);
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;
	
	offset = 1;
	pos = num.begin() + offset;
	cout << "erase " << num.at(offset) << " at " << offset << endl;
	num.erase(pos);
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
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
