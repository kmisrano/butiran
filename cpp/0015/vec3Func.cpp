/*	vec3Func.cpp	Functions related to vector operations.		Sparisoma Viridi | https://github.com/dudung/butiran		Compile: g++ vec3Func.cpp -o vec3Func	Execute: ./vec3Func		20190125	Modify vec3Unit for this program.	0604 Start at home.*/#include <iostream>#include <cmath>#include <cstdlib>using namespace std;class Vector3 {public:	double x;	double y;	double z;};int main(int argc, char *argv[]) {	// Define 1st vector	Vector3 r8;	r8.x = 3.0/sqrt(2);	r8.y = 4.0/sqrt(2);	r8.z = 5.0/sqrt(2);	cout << "r8 = ";	cout << "(" << r8.x << ", " << r8.y << ", ";	cout << r8.z << ")" << endl;		// Length of vector	double ll = r8.x * r8.x + r8.y * r8.y + r8.z * r8.z;	double l8 = sqrt(ll);	Vector3 u8;	u8.x = r8.x / l8;	u8.y = r8.y / l8;	u8.z = r8.z / l8;		cout << "|r8| = " << l8 << endl;	cout << "u8 = r8 / |r8| = ";	cout << "(" << u8.x << ", " << u8.y << ", ";	cout << u8.z << ")" << endl;		return 0;}