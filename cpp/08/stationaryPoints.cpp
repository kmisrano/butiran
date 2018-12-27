/*
	stationaryPoints.cpp
	Find all stationary points of a polynamial
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ stationaryPoints.cpp -o stationaryPoints
	Execute: ./stationaryPoints
	
	20181227
	Start this program at Physics in Bandung.
*/

#include <iostream>
#include <cmath>
#include <vector>

double f(double);
double fx(double, double);
double fxx(double, double);

using namespace std;

int main(int argc, char *argv[]) {
	// Define dx and eps
	double dx = 1E-6;
	double eps = 1E-4;
	
	// Calculate derivative
	double xbeg = -1;
	double xend = 1;
	double x = xbeg;
	
	// Define stationary points
	vector<double> point;
	vector<string> kind;
	
	// Search stationary points
	int M = 3;
	for(int i = 0; i < M; i++) {
		
		while(x <= xend) {
			bool condition;
			string type;
			if(i == 0) {
				condition = fxx(x, dx) < 0;
				type = "max";
			} else if (i == 1) {
				condition = fxx(x, dx) == 0;
				type = "inf";
			} else {
				condition = fxx(x, dx) > 0;				
				type = "min";
			}
			if(abs(fx(x, dx)) < eps && condition) {
				point.push_back(x);
				kind.push_back(type);
				break;
			}
			
			x += dx;
		}
	}
	
	cout << "# x\tf(x)\tfx(x)\tfxx(x)\tkind" << endl;
	int N = point.size();
	for(int i = 0; i < N; i++) {
		cout.precision(3);
		cout << point[i] << "\t";
		cout << fixed << f(point[i]) << "\t";
		cout << fixed << fx(point[i], dx) << "\t";
		cout << fixed << fxx(point[i], dx) << "\t";
		cout << kind[i] << endl;
	}
		
	return 0;
}

double f(double x) {
	double y = 10 * (x + 1) * x * x * x * (x - 1) + 2;
	return y;
}

double fx(double x, double dx) {
	double y = (f(x + dx) - f(x)) / (dx);
	return y;
}

double fxx(double x, double dx) {
	double y = (f(x + dx) - 2 * f(x) + f(x + dx)) / (dx * dx);
	return y;
}
