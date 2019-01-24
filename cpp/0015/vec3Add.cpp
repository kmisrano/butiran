/*	vec3Add.cpp	Add two vector manually.		Sparisoma Viridi | https://github.com/dudung/butiran		Compile: g++ vec3Add.cpp -o vec3Add	Execute: ./vec3Add		20190124	Start this program.	1642 finish add two vectors manually and display the result	1644 update github*/#include <iostream>#include <cmath>#include <cstdlib>using namespace std;class Vector3 {public:	double x;	double y;	double z;};int main(int argc, char *argv[]) {	// Define 1st vector	Vector3 r1;	r1.x = 1;	r1.y = 2;	r1.z = 3;	cout << "r1 = ";	cout << "(" << r1.x << ", " << r1.y << ", ";	cout << r1.z << ")" << endl;		// Define 2nd vector	Vector3 r2;	r2.x = -1;	r2.y = -2;	r2.z = -3;	cout << "r2 = ";	cout << "(" << r2.x << ", " << r2.y << ", ";	cout << r2.z << ")" << endl;		// Add two vectors	Vector3 r3;	r3.x = r1.x + r2.x;	r3.y = r1.y + r2.y;	r3.z = r1.z + r2.z;	cout << "r3 = r1 + r2 = ";	cout << "(" << r3.x << ", " << r3.y << ", ";	cout << r3.z << ")" << endl;		return 0;}