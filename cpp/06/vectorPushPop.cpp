/*
	vectorPushPop.cpp
	Illustration of the use push_back() and pop_back()
	in vector
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ vectorPushPop.cpp -o vectorPushPop
	Execute: ./vectorPushPop
	
	20181224
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
	
	num.push_back(99);
	disp(num);
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;
	
	int popped = num.back();
	num.pop_back();
	disp(num);
	cout << "popped = " << popped << endl;
	cout << "size = " << num.size() << endl;
	cout << "capacity = " << num.capacity() << endl;
	cout << endl;
	
	popped = num.back();
	num.pop_back();
	disp(num);
	cout << "popped = " << popped << endl;
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
