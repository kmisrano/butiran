/*
	vectorInsert.cpp
	Illustration of the use insert() in vector
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ vectorInsert.cpp -o vectorInsert
	Execute: ./vectorInsert
	
	20181224
	Start this program at home in Bogor.
*/

#include <iostream>
#include <vector>

using namespace std;

void disp(vector<int>);

int main(int argc, char *argv[]) {
	vector<int> num;
	vector<int>::iterator pos;
	int offset;
	
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;
	
	num = {1, 2, 3, 4};
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;
	
	offset = 1;
	pos = num.begin() + offset;
	num.insert(pos, 100);
	cout << "insert at " << offset << endl;
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;
	
	offset = 3;
	pos = num.begin() + offset;
	num.insert(pos, 200);
	cout << "insert at " << offset << endl;
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
