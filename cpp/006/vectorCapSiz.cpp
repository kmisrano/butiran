/*
	vectorCapSiz.cpp
	Illustration of the use of capacity() and size() function
	in vector contatiner
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ vectorCapSiz.cpp -o vectorCapSiz
	Execute: ./vectorCapSiz
	
	20181223
	Start this program at home in Bogor.
*/

#include <iostream>
#include <vector>

using namespace std;

void disp(vector<int>);

int main(int argc, char *argv[]) {
	vector<int> num;
	
	num = {8, 9, 10};
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;
	
	num.reserve(5);
	num = {3, 2};
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;
	
	num.push_back(-100);
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;

	num.push_back(99);
	num.push_back(98);
	num.push_back(747);
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;

	num = {};
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
