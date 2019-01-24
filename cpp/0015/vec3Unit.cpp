/*	vec3Unit.cpp	Unit of a vector.		Sparisoma Viridi | https://github.com/dudung/butiran		Compile: g++ vec3Unit.cpp -o vec3Unit	Execute: ./vec3Unit		20190125	Modify vec3Len for this program.	0549 Start at home.*/#include <iostream>#include <cmath>#include <cstdlib>using namespace std;class Vector3 {public:	double x;	double y;	double z;};Vector3 add(Vector3, Vector3);Vector3 sub(Vector3, Vector3);Vector3 cross(Vector3, Vector3);double dot(Vector3, Vector3);double len(Vector3);Vector3 unit(Vector3);int main(int argc, char *argv[]) {	// Define 1st vector	Vector3 r8;	r8.x = 3.0/sqrt(2);	r8.y = 4.0/sqrt(2);	r8.z = 5.0/sqrt(2);	cout << "r8 = ";	cout << "(" << r8.x << ", " << r8.y << ", ";	cout << r8.z << ")" << endl;		// Length of vector	double ll = r8.x * r8.x + r8.y * r8.y + r8.z * r8.z;	double l8 = sqrt(ll);	Vector3 u8;	u8.x = r8.x / l8;	u8.y = r8.y / l8;	u8.z = r8.z / l8;		cout << "|r8| = " << l8 << endl;	cout << "u8 = r8 / |r8| = ";	cout << "(" << u8.x << ", " << u8.y << ", ";	cout << u8.z << ")" << endl;		return 0;}// Add two vectorsVector3 add(Vector3 r1, Vector3 r2) {	}// Sub two vectorsVector3 sub(Vector3 r1, Vector3 r2) {	}// Cross two vectorsVector3 cross(Vector3 r1, Vector3 r2) {	}// Dot two vectorsdouble dot(Vector3 r1, Vector3 r2) {	}// Length of a vectordouble len(Vector3 r) {	}// Unit of a vectorVector3 unit(Vector3 r) {	}